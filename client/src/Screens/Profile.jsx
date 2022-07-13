import React from 'react'
import '../assets/css/Profile.css'
import { defaultImgs } from '../defaultImages'
import { Link } from 'react-router-dom'
import { TweetInFeed } from '../Components'
import { useMoralis } from 'react-moralis'

function Profile() {
  const { Moralis } = useMoralis()
  const user = Moralis.User.current()

  return (
    <>
      <div className="pageIdentify">Profile</div>
      <img
        src={user.attributes.banner ? user.attributes.banner : defaultImgs[1]}
        alt=""
        className="profileBanner"
      />
      <div className="pfpContainer">
        <img
          src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}
          alt=""
          className="profilePFP"
        />
        <div className="profileName">
          {user.attributes.ethAddress.slice(0, 6)}
        </div>
        <div className="profileWallet">{`${user.attributes.ethAddress.slice(
          0,
          4,
        )}...${user.attributes.ethAddress.slice(38)}`}</div>
        <Link to="/settings">
          <div className="profileEdit">Edit Profile</div>
        </Link>
        <div className="profileBio">{user.attributes.bio}</div>
        <div className="profileTabs">
          <div className="profileTab">Your Tweets</div>
        </div>
      </div>
      <TweetInFeed profile={true} />
    </>
  )
}

export default Profile
