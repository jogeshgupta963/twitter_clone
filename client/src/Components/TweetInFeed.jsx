import React, { useState, useEffect } from 'react'
import { defaultImgs } from '../defaultImages'
import '../assets/css/TweetInFeed.css'
import netflix from '../assets/imgs/netflix.png'
import { Icon } from 'web3uikit'
import { useMoralis } from 'react-moralis'

function TweetInFeed({ profile }) {
  const [tweetArr, setTweetArr] = useState()
  const { Moralis, account } = useMoralis()

  useEffect(() => {
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend('Tweets')
        const query = new Moralis.Query(Tweets)
        if (profile) {
          query.equalTo('tweetAcc', account)
        }
        const results = await query.find()
        setTweetArr(results)
      } catch (err) {
        console.log(err)
      }
    }
    getTweets()
  }, [profile])

  return (
    <>
      {tweetArr &&
        tweetArr
          .map((tweet, index) => {
            return (
              <div>
                <div className="feedTweet">
                  <img
                    src={
                      tweet.attributes.tweeterPfp
                        ? tweet.attributes.tweeterPfp
                        : defaultImgs[0]
                    }
                    className="profilePic"
                    alt="profile pic"
                  />
                  <div className="completeTweet">
                    <div className="who">
                      {tweet.attributes.tweeterUserName.slice(0, 6)}
                      <div className="accWhen">{`${tweet.attributes.tweeterAcc.slice(
                        0,
                        4,
                      )}...${tweet.attributes.tweeterAcc.slice(
                        38,
                      )} . ${tweet.attributes.createdAt.toLocaleString(
                        'en-us',
                        {
                          month: 'short',
                        },
                      )} ${tweet.attributes.createdAt.toLocaleString('en-us', {
                        day: 'numeric',
                      })}`}</div>
                    </div>
                    <div className="tweetContent">
                      {tweet.attributes.tweetTxt}
                      {tweet.attributes.tweetImg && (
                        <img
                          src={tweet.attributes.tweetImg}
                          className="tweetImg"
                          style={{ width: '38%' }}
                        />
                      )}
                    </div>
                    <div className="interactions">
                      <div className="interactionNums">
                        <Icon
                          fill="#3f3f3f"
                          size={20}
                          svg="messageCircle"
                        ></Icon>
                      </div>
                      <div className="interactionNums">
                        <Icon fill="#3f3f3f" size={20} svg="star"></Icon>
                      </div>
                      <div className="interactionNums">
                        <Icon fill="#3f3f3f" size={20} svg="matic"></Icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          .reverse()}
    </>
    // <div>
    //   <div className="feedTweet">
    //     <img src={defaultImgs[0]} className="profilePic" alt="profile pic" />
    //     <div className="completeTweet">
    //       <div className="who">
    //         Jogi
    //         <div className="accWhen">0x42...314 . 1h</div>
    //       </div>
    //       <div className="tweetContent">
    //         Nice Day Golfing Today Shot 73 (+2)
    //         <img
    //           src={netflix}
    //           className="tweetImg"
    //           style={{ width: '38%' }}
    //           alt=""
    //         />
    //       </div>
    //       <div className="interactions">
    //         <div className="interactionNums">
    //           <Icon fill="#3f3f3f" size={20} svg="messageCircle"></Icon>
    //         </div>
    //         <div className="interactionNums">
    //           <Icon fill="#3f3f3f" size={20} svg="star"></Icon>
    //         </div>
    //         <div className="interactionNums">
    //           <Icon fill="#3f3f3f" size={20} svg="matic"></Icon>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="feedTweet">
    //     <img src={defaultImgs[0]} className="profilePic" alt="profile pic" />
    //     <div className="completeTweet">
    //       <div className="who">
    //         Jogi
    //         <div className="accWhen">0x42...314 . 1h</div>
    //       </div>
    //       <div className="tweetContent">
    //         Thoughts about idk mangoes?
    //         <div className="interactions">
    //           <div className="interactionNums">
    //             <Icon fill="#3f3f3f" size={20} svg="messageCircle"></Icon>
    //           </div>
    //           <div className="interactionNums">
    //             <Icon fill="#3f3f3f" size={20} svg="star"></Icon>
    //           </div>
    //           <div className="interactionNums">
    //             <Icon fill="#3f3f3f" size={20} svg="matic"></Icon>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default TweetInFeed
