import { Component } from "react";
import { SWRConfig } from "swr";
import Layout from "@/components/Layout";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (data.message && data.message === "Not a valid object") {
    return null;
  }

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return data;
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
