import env from '../enviroment/environment';

export const getImageOfAssets = (path) => {
  return `${env.contentAssets}${path}`
} 

export const getImageOfAssetsMark = (path) => {
  return `${env.contentAssetsMark}${path}`
} 