export function getConnectToken(companyName, authenticatorEnv) {
  const vm = this

  vm.submittingConnect = true

  fetch('/connect_tokens/create')
    .then(response => response.json())
    .then((data) => {
      vm.submittingConnect = false
      if (authenticatorEnv === 'sandbox') {
        vm.openAuthenticatorEmbed(data.attributes.token, companyName, authenticatorEnv)

        return
      }
      vm.openAuthenticatorEmbed(data.data.id, companyName, authenticatorEnv) 
    })
    .catch((error) => {
      vm.submittingConnect = false
      console.error('Error msg:', error)
    })
}
export function getAccessToken(publicToken) {
  const vm = this

  fetch(`/public_token/exchange/${publicToken}`)
    .then(response => response.json())
    .then((data) => {
      vm.access_token = data.data.id
    })
    .catch((error) => {
      console.error('Error msg:', error)
    })
}
export function openAuthenticatorEmbed(connectToken, companyName, authenticatorEnv) {
  const vm = this

  vm.submittingConnect = false

  NCConnector.create({
    company_name: companyName,
    connect_token: connectToken,
    successCallback: (token) => {
      if (authenticatorEnv === 'sandbox') {
        vm.access_token = "sandbox-access-token-19393i3ee"

        return
      }
      vm.getAccessToken(token.id)
    },
    failureCallback: (error_message) => { console.error(error_message) }
  })
}
export function addAccessToken() {
  const vm = this

  vm.addingToken = true
}
