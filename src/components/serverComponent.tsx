import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function ServerComponent() {
  const supabase = createServerComponentClient({ cookies });

  const { data: posts } = await supabase.from('posts').select('*');

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
