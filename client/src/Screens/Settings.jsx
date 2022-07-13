import React, { useState, useRef, useEffect } from 'react'
import '../assets/css/Settings.css'
import { Input } from 'web3uikit'
import { defaultImgs } from '../defaultImages'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'

function Settings() {
  const [pfps, setPfps] = useState([])

  const [selectedPfp, setSelectedPfp] = useState()
  const inputFile = useRef(null)
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1])

  const [theFile, setTheFile] = useState()
  const [username, setUsername] = useState()
  const [bio, setBio] = useState()

  const { Moralis, isAuthenticated, account } = useMoralis()
  const Web3Api = useMoralisWeb3Api()

  const saveEdits = async () => {
    const User = Moralis.Object.extend('_User')
    const query = new Moralis.Query(User)
    const myDetails = await query.first()

    if (bio) {
      myDetails.set('bio', bio)
    }
    if (username) {
      myDetails.set('username', username)
    }
    if (selectedPfp) {
      myDetails.set('pfp', selectedPfp)
    }
    if (theFile) {
      const file = new Moralis.File(theFile.name, theFile)
      await file.saveIPFS()
      myDetails.set('banner', file.ipfs())
    }

    await myDetails.save()
    window.location.reload()
  }

  const onBannerClick = () => {
    inputFile.current.click()
  }
  const changeHandle = (e) => {
    const file = e.target.files[0]
    setTheFile(file)
    setSelectedFile(URL.createObjectURL(file))
  }
  const resolveLink = (url) => {
    if (!url || !url.includes('ipfs://')) return url
    return url.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/')
  }

  useEffect(() => {
    const fetchNfts = async () => {
      const options = {
        chain: 'mumbai',
        address: account,
      }
      const nfts = await Web3Api.account.getNfts(options)
      const images = nfts.result.map((nft) =>
        resolveLink(JSON.parse(nft.metadata)?.image),
      )
      setPfps(images)
    }
    fetchNfts()
  }, [isAuthenticated, account])

  return (
    <>
      <div className="pageIdentify">Settings</div>
      <div className="settingsPage">
        <Input
          label="Name"
          name="NameChange"
          width="100%"
          labelBgColor="#141d26"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          label="Bio"
          name="BioChange"
          width="100%"
          labelBgColor="#141d26"
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="pfp">
          Profile Image(Your Nfts)
          <div className="pfpOptions">
            {pfps.map((pfp, index) => {
              return (
                <img
                  src={pfp}
                  alt="pfp"
                  className={
                    selectedPfp === pfp ? 'pfpOptionSelected' : 'pfpOption'
                  }
                  onClick={() => {
                    setSelectedPfp(pfps[index])
                  }}
                />
              )
            })}
          </div>
        </div>

        <div className="pfp">
          Profile Banner
          <div className="pfpOptions">
            <img
              src={selectedFile}
              onClick={onBannerClick}
              alt="banner"
              className="banner"
            />
            <input
              type="file"
              name="file"
              ref={inputFile}
              onChange={changeHandle}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="save" onClick={() => saveEdits()}>
          Save
        </div>
      </div>
    </>
  )
}

export default Settings
