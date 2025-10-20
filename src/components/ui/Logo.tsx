import Image from 'next/image';

export default function Logo({ width = 40, height = 40, className = '', alt = 'Valt LMS' }: { width?: number; height?: number; className?: string; alt?: string }) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <Image src="/logo.png" width={width} height={height} alt={alt} />
    </div>
  );
}
