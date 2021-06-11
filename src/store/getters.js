const getters = {
  device: state => state?.app?.device,
  userId: state => state?.user?.userId,
  token: state => state?.user?.token,
  avatar: state => state?.user?.avatar,
  name: state => state?.user?.name
}
export default getters

