/* eslint-disable camelcase */
import React from 'react'

interface SidebarLinksProps {
  link_name: string
  href: string
}

export function SidebarLinks({ href, link_name }: SidebarLinksProps) {
  return (
    <a
      href={href}
      className="cursor-pointer transition-colors hover:text-gray-50 hover:underline"
    >
      {link_name}
    </a>
  )
}
