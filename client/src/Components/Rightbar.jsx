import React from 'react'
import '../assets/css/Rightbar.css'
import spaceshooter from '../assets/imgs/spaceshooter.jpg'
import netflix from '../assets/imgs/netflix.png'
import academy from '../assets/imgs/academy.jpg'
import youtube from '../assets/imgs/download.png'
import js from '../assets/imgs/js.png'
import { Input } from 'web3uikit'
function Rightbar() {
  const trends = [
    {
      img: spaceshooter,
      text: 'Learn how to build a Web3 FPS game using unity...',
      link:
        'https://moralis.io/moralis-projects-learn-to-build-a-web3-space-fps-game/',
    },
    {
      img: netflix,
      text: "The fisrt Moralis Project! Let's Netflix and chill...",
      link:
        'https://moralis.io/moralis-projects-learn-to-build-a-web3-netflix-clone/',
    },
    {
      img: academy,
      text: 'Master DeFi in 2022. Start  at the Moralis Academy...',
      link: 'https://academy.moralis.io/courses/defi-101',
    },
    {
      img: js,
      text: 'Become a Web3 Developer with just simple JS...',
      link: 'https://academy.moralis.io/all-courses',
    },
    {
      img: youtube,
      text: 'Best youtube channel to learn about Web3...',
      link: 'https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw',
    },
  ]

  return (
    <div className="rightbarContent">
      <Input
        label="Search Twitter"
        name="Search Twitter"
        prefixIcon="search"
        labelBgColor="#141d26"
      ></Input>
      <div className="trends">
        News For You
        {trends.map((trend, index) => (
          <div
            className="trend"
            key={index}
            onClick={() => window.open(trend.link)}
          >
            <img src={trend.img} className="trendImg" alt={trend.text} />
            <div className="trendText">{trend.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Rightbar
