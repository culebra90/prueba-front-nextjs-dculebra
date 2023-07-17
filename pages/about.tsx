export const getServerSideProps: any = async () => {
    const res = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
    const data = await res.json();
  
    return {
      props: {
        data,
      },
    };
  };
  
  export default function About({ data }: { data: any }) {
    if (!data) {
      return <>Cargando...</>;
    }
  
    console.log("data ==>", data);
  
    return <>Hola</>;
  }