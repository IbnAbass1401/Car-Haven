import { ClipLoader } from 'react-spinners'

const override = {
  display: 'block',
  margin: '80px auto',
}

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color="#8B3FC8"
      loading={loading}
      cssOverride={override}
      size={80}
      aria-label="Loading cars"
    />
  )
}

export default Spinner