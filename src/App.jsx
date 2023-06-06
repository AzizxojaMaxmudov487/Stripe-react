import { useState } from 'react'
import './App.css'
import StripeContainer from './StripeContainer'

function App() {

  const [showItem, setShowItem] = useState(false)

  return (
    <div className="App">
      <>
        <h1 className='shopName'>Shopping place</h1>
        {showItem ? (
          <StripeContainer/>
        ): (
          <>
          <div className="infoTovar">
            <h3 className='tovarName'>Redmi 9T 64GB</h3>
            <h2 className='tovarPrice'>180$</h2>
            <button className='purchaseBtn' onClick={() => setShowItem(true)}>
              Purchase 🛒
            </button>
          </div>
          <img src="https://s3.amazonaws.com/images.ecwid.com/images/27678069/1418568090.jpg" className="phoneImg" alt='Redmi' />
          </>
        )}
      </>
    </div>
  )
}

export default App
