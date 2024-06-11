const truncateBio = (bio: String, maxLenght: number) => {
    if(bio.length > maxLenght ) {
        return bio.slice(0, maxLenght) + '...'
    } 
    return bio
}

export default truncateBio