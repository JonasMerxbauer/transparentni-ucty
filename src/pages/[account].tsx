import { type GetServerSideProps, type NextPage } from "next";
import { type Account, type Balance, type Transaction } from "../types";

import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import { formatAccountNumber, formatDate, formatIban } from "../utils";

const Account: NextPage<{
  accountInfo: Account;
  balance: Balance;
  transactions: Transaction[];
}> = ({ accountInfo, balance, transactions }) => {
  return (
    <>
      <Head>
        <title>{accountInfo.name} | Transparentní účet</title>
        <meta name="description" content="Transparentní účet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gray-100">
        <Link
          href={"/"}
          className="m-4 flex items-center gap-1 self-start rounded-full bg-white py-2 px-4 shadow sm:m-12 sm:gap-2 sm:py-4 sm:px-8"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div className="font-medium sm:text-lg">
            Zpět na transparentní účty
          </div>
        </Link>
        <div className="flex max-w-screen-lg flex-1 flex-col gap-12 px-4 py-16 ">
          <BalanceInfo balance={balance} accountInfo={accountInfo} />
          <TransactionTable
            transactions={transactions}
            accountInfo={accountInfo}
          />
        </div>
        <Footer />
      </main>
    </>
  );
};

const BalanceInfo = ({
  balance,
  accountInfo,
}: {
  balance: Balance;
  accountInfo: Account;
}) => {
  return (
    <div className="flex h-48 min-w-full flex-col justify-between rounded-lg bg-white p-8 shadow ring-1 ring-black ring-opacity-5 sm:h-56 sm:p-12">
      <div className="text-2xl font-bold">{accountInfo.name}</div>
      <div>
        <div>
          Číslo účtu:{" "}
          {formatAccountNumber(accountInfo.identification.otherAccountNumber)}/
          {accountInfo.servicer.bankCode}
        </div>
        <div>IBAN: {formatIban(accountInfo.identification.iban)}</div>
        <div className="font-medium">
          Zůstatek: {balance.amount.value} {balance.amount.currency}
        </div>
      </div>
    </div>
  );
};

const TransactionTable = ({
  transactions,
  accountInfo,
}: {
  transactions: Transaction[];
  accountInfo: Account;
}) => {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Datum
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Připsáno/odepsáno
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Protistrana
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              VS | SS
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Detail transakce
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {transactions.map((transaction) => {
            const isIncoming =
              transaction.ownAccountNumber !==
              formatAccountNumber(
                accountInfo.identification.otherAccountNumber
              );

            return (
              <tr key={transaction.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                  {formatDate(transaction.postingDate)}
                </td>
                <td
                  className={
                    " whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 " +
                    (isIncoming ? "" : " text-red-500")
                  }
                >
                  {isIncoming
                    ? `${transaction.amount.value} ${transaction.amount.currency}`
                    : `-${transaction.amount.value} ${transaction.amount.currency}`}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:table-cell">
                  {transaction.counterPartyAccount.accountName}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:table-cell">
                  {transaction.variableSymbol} | {transaction.specificSymbol}
                </td>
                <td className="break-all px-3 py-4 text-sm text-gray-900">
                  {transaction.details.detail1}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { account } = context.query;

  if (typeof account !== "string" || !process.env.NEXT_PUBLIC_API_URL) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  const urls = [
    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${account}`,
    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${account}/balance`,
    `${process.env.NEXT_PUBLIC_API_URL}/api/accounts/${account}/transactions`,
  ];

  try {
    const [accountInfo, balance, transactions] = (await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    )) as [Account, Balance, Transaction[]];

    return {
      props: {
        accountInfo,
        balance,
        transactions,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};

export default Account;
