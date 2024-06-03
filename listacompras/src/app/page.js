import Head from 'next/head';
import AddItem from '../componente/addItem';
import itemLista from '../componente/itemLista';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Item Lista</title>
      </Head>
      <AddItem />
      <itemLista />
    </div>
  );
}



