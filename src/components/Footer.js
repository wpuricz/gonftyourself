const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <>
      <footer className='text-center text-capitalize'>
        copyright GO! NFT Yourself &copy; {year}
      </footer>
    </>
  )
}

export default Footer
