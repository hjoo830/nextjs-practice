import { getSortedPostsData } from "@/utils/getSortedPostsData";
import Head from "next/head";

export default function Home({ allPostsData }) {
  return (
    <div>
      <Head>
        <title>Hwang Hyoju</title>
      </Head>
      <section>
        <p>Hello, I'm Hyoju. I'm a frontend developer.</p>
        <p>(This is a sample website)</p>
      </section>
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <a>{title}</a>
              <br />
              <small>{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// build time, server side
export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};
