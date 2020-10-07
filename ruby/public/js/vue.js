const vueApp = new Vue({
  el: '#app',
  data: {
    access_token: null,
    addingToken: false,
    submittingConnect: false,
    jobs: [],
    fakeData: {
      employees: {
        status: "success",
        data: [
          {
            "error": "data did not fetch please try again and ensure you put valid credentials"
          }
        ]
      },
      jobs: {
        status: "success",
        data: [
          {
            "error": "data did not fetch please try again and ensure you put valid credentials"
          }
        ]
      },
      payrolls: {
        status: "success",
        data: [
          {
            "error": "data did not fetch please try again and ensure you put valid credentials"
          }
        ]
      }
    }
  },
  computed: {
    credentialsAdded() {
      const vm = this

      if(vm.access_token){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    fetchRequest(record) {
      const vm = this

      fetch(`/${record}/fetch_resource/${vm.access_token}`)
      .then(response => response.json())
      .then((data) => {
        vm.fakeData[record] = data
        vm.fakeData[record]['status'] = "success"
        console.log('data' + ' ' + record, vm.fakeData[record])
      })
      .catch((error) => {
        console.error('Error msg:', error);
      });
    },
    async getConnectToken(companyName) {
      const vm = this

      vm.submittingConnect = true

      let response = await fetch('/connect_tokens/create')
      let result = await response.json()
      const connectToken = result.data.id

      vm.openAuthenticatorEmbed(connectToken, companyName) 
    },
    async getAccessToken(publicToken) {
      const vm = this

      let response = await fetch(`/public_token/exchange/${publicToken}`)

      let result = await response.json()
      const accessToken = result.data.id

      vm.access_token = accessToken
    },
    openAuthenticatorEmbed(connectToken, companyName) {
      const vm = this
      vm.submittingConnect = false

      NCConnector.create({
        company_name: companyName,
        connect_token: connectToken,
        successCallback: (token) => {
          vm.getAccessToken(token.id)
        },
        failureCallback: (error_message) => { console.error(error_message) }
      })
    },
    addAccessToken() {
      const vm = this

      vm.addingToken = true
    }
  }
})

Vue.config.devtools = true
