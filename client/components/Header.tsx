import Link from 'next/link';
import React from 'react';

const linkStyle = {
  marginRight: 15
};

export default function Header() {
  return (
    <div>
      <Link href="/algo">
        <a style={linkStyle}>Algo</a>
      </Link>
    </div>
  );
}
