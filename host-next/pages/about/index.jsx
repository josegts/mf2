import dynamic from 'next/dynamic';
import React from 'react'
const Button = dynamic(() => import('navbar/Button'), {
  ssr: false,
});

const About = () => {
  return (
    <div>
      About
      <Button />
    </div>
  )
}

export default About