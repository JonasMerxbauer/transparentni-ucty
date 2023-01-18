import { type NextPage } from "next";
import { type Account } from "../types";

import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import { formatAccountNumber } from "../utils";

const Home: NextPage<{ accounts: Account[] }> = ({ accounts }) => {
  return (
    <>
      <Head>
        <title>Transparentní účty</title>
        <meta name="description" content="List transparentních účtů" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-1 flex-col items-center justify-center gap-12 px-4 py-16">
          <AccountList accounts={accounts} />
        </div>
        <Footer />
      </main>
    </>
  );
};

const AccountList = ({ accounts }: { accounts: Account[] }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">Transparentní účty</h1>
      {accounts.map((account) => {
        return (
          <Link
            key={account.id}
            href={formatAccountNumber(
              account.identification.otherAccountNumber
            )}
          >
            <div className="flex gap-4 rounded-lg bg-white p-4 shadow ring-1 ring-black ring-opacity-5">
              <div className="w-64">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
                  {account.name}
                </div>
                <div>
                  {formatAccountNumber(
                    account.identification.otherAccountNumber
                  )}
                  /{account.servicer.bankCode}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export async function getServerSideProps() {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return {
      notFound: true,
    };
  }

  const accounts = (await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts`)
  ).json()) as Account[];

  return {
    props: {
      accounts,
    },
  };
}

export default Home;
