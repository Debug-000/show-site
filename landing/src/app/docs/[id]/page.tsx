interface DocsPageParams {
  id: string;
}

export default function BlogPage({ params }: { params: DocsPageParams }) {
  return (
    <div>
      <h1>Our Docs Page with Id: {params.id}</h1>
    </div>
  );
}
