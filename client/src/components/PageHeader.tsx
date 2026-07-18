interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 lg:mb-12">
      <h1 className="text-2xl lg:text-3xl font-medium mb-3">{title}</h1>
      {description && (
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
