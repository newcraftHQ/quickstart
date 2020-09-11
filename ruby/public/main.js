const BASE_URL = 'https://development.newcraft.io/api/v1'

const vueApp = new Vue({
  el: '#app',
  data: {
    client_id: null,
    client_secret: null,
    access_token: null,
    openTokenForm: false,
    jobs: [],
    useCredentials: false,
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
      }
    }
  },
  computed: {
    credentialsAdded() {
      const vm = this

      if (vm.client_id && vm.client_secret && vm.access_token) {
        vm.useCredentials = true
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    fetchRequest(record) {
      const vm = this

      const params = {
        client_id: vm.client_id,
        client_secret: vm.client_secret,
        access_token: vm.access_token
      }

      fetch(BASE_URL + `/${record}/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      })
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
    async getConnectToken() {
      const vm = this

      const params = {
        client_id: vm.client_id,
        client_secret: vm.client_secret
      }

      let response = await fetch(BASE_URL + '/connect_tokens/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      })

      let result = await response.json()
      const connectToken = result.data.id

      vm.openAuthenticatorEmbed(connectToken) 
    },
    async getAccessToken(publicToken) {
      const vm = this

      const params = {
        client_id: vm.client_id,
        client_secret: vm.client_secret,
        public_token: publicToken
      }

      let response = await fetch(BASE_URL + '/public_token/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      })

      let result = await response.json()
      const accessToken = result.data.id

      vm.access_token = accessToken
      alert(`Copy Access token: ${accessToken}`);
    },
    openAuthenticatorEmbed(connectToken) {
      const vm = this

      NCConnector.create({
        connect_token: connectToken,
        successCallback: (token) => {
          vm.getAccessToken(token.id)
        },
        failureCallback: (error_message) => { console.error(error_message) }
      })
    },
    openConnectTokenForm() {
      const vm = this

      vm.openTokenForm = true
      vm.useCredentials = false
    },
    openUseCredentials() {
      const vm = this

      vm.openTokenForm = false
      vm.useCredentials = true
    }
  }
})

Vue.config.devtools = true
