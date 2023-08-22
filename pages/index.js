import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "1st Meetup",
    image: "https://tourismus.ulm.de/_thumbnails_/2342_1_00_Muenster.jpg",
    address: "Große Straße 1, 12345 Ulm",
    description: "This is a 1st meetup",
  },
  {
    id: "m2",
    title: "2nd Meetup",
    image: "https://tourismus.ulm.de/_thumbnails_/2342_1_00_Muenster.jpg",
    address: "Große Straße 1, 12345 Ulm",
    description: "This is a 2nd meetup",
  },
];

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://zluf:TV13949T2Lq9jWaz@cluster0.1h6gzey.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }
