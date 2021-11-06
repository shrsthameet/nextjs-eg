import{ useState } from 'react'

const useModal = () => {
  const [modal, setModal] = useState<boolean>(false)

  const toggleModal = () => {
    setModal(!modal)
  }
  return { modal, toggleModal }
}

export default useModal
