interface BlogPageParams {
  id: string;
}

export default function BlogPage({ params }: { params: BlogPageParams }) {
  return (
    <div>
      <h1>Our Blog {params.id}</h1>
    </div>
  );
}
