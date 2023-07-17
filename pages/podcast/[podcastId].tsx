import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { podcastId } = router.query;

  return (
    <div>
      <h1>Podcast ID: {podcastId}</h1>
    </div>
  );
};

export default Post;