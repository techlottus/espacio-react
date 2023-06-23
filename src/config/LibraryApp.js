import React from 'react'
import env from '../enviroment/environment'
import { typesMark } from '../types/typesMark'
import LibraryULA from './LibraryULA/LibraryULA'
import LibraryUTC from './LibraryUTC/LibraryUTC'

const LibraryApp = () => {

  const handleLibrary = () => {
    switch(env.mark) {
      case typesMark.ula:
        return <LibraryULA />;
      case typesMark.utc:
        return <LibraryUTC />;
      default:
        return <LibraryUTC />;
    }
  }

  return (
    <>
      {
        handleLibrary()
      }
    </>
  )
}

export default LibraryApp
