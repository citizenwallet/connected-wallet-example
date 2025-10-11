import {
  generateCalldataLink,
  generateReceiveLink,
  getAccountBalance,
  getProfileFromAddress,
} from "@citizenwallet/sdk";
import { verifyConnectedUrl } from "@citizenwallet/sdk";
import { CommunityConfig } from "@citizenwallet/sdk";
import Image from "next/image";
import CommunityJson from "../cw/community.json";
import Link from "next/link";
import OpenInWallet from "./open-in-wallet";
import ActionButtons from "./action-buttons";

export default async function UserProfile({
  searchParams,
}: {
  searchParams: Promise<{
    sigAuthAccount?: string; // these will be added by citizen wallet when it opens the link
    sigAuthExpiry?: string;
    sigAuthSignature?: string;
    sigAuthRedirect?: string;
  }>;
}) {
  const community = new CommunityConfig(CommunityJson);
  const token = community.getToken();

  const params = new URLSearchParams(await searchParams);

  const { sigAuthAccount, sigAuthExpiry, sigAuthSignature, sigAuthRedirect } =
    await searchParams;
  if (
    !sigAuthRedirect ||
    !sigAuthAccount ||
    !sigAuthExpiry ||
    !sigAuthSignature
  ) {
    return <OpenInWallet />;
  }

  // null if invalid
  // will return the account owner's address
  const accountOwnerAddress = await verifyConnectedUrl(community, { params });
  if (!accountOwnerAddress) {
    return <div>Invalid account owner address</div>;
  }

  // can get the profile from the address
  const accountProfile = await getProfileFromAddress(
    "ipfs.internal.citizenwallet.xyz",
    community,
    accountOwnerAddress
  );

  if (!accountProfile) {
    return <div>No profile found</div>;
  }

  const balance =
    (await getAccountBalance(community, accountOwnerAddress)) ?? BigInt(0);

  const adjustedBalance = balance / BigInt(10 ** token.decimals);

  const destinationAddress = accountOwnerAddress; // send to self but could put any other address

  const requestTokenLink = generateReceiveLink(
    sigAuthRedirect,
    community,
    destinationAddress,
    "100", // in cents
    "test transaction"
  );

  const contractAddress = "0x388C1B75A832B9e5a0905BC7B41178C0cedA8ff5";
  const calldata =
    "0xb61d27f6000000000000000000000000388c1b75a832b9e5a0905bc7b41178c0ceda8ff50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000240121b93f000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000";

  const requestCalldataLink = generateCalldataLink(
    sigAuthRedirect,
    community,
    contractAddress,
    BigInt(0),
    calldata
  );

  const successLink = encodeURIComponent(
    "https://connected-wallet-example.vercel.app/success"
  );
  const closeLink = encodeURIComponent(`${sigAuthRedirect}/close`);

  // Dummy user data
  const user = {
    username: accountProfile.username,
    name: accountProfile.name,
    description: accountProfile.description,
    image: accountProfile.image,
    isVerified: true,
    balance: adjustedBalance,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        {/* Header with back button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-semibold">Profile</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src={user.image}
                alt={user.name}
                width={120}
                height={120}
                className="w-32 h-32 rounded-full object-cover"
              />
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              {user.isVerified && (
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-1">
              @{user.username}
            </p>
          </div>

          {/* Balance */}
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Balance: {user.balance} {token.symbol}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {user.description}
            </p>
          </div>

          <ActionButtons
            requestTokenLink={`${requestTokenLink}&success=${successLink}&close=${closeLink}`}
            requestCalldataLink={`${requestCalldataLink}&success=${successLink}&close=${closeLink}`}
            symbol={token.symbol}
          />
        </div>
      </div>
    </div>
  );
}
