const vueApp = new Vue({
  el: '#app',
  data: {
    access_token: null,
    addingToken: false,
    submittingConnect: false,
    requestingResource: false,
    jobs: [],
    resourceData: null,
    employeesFields: [
      {
        key: 'full_name',
        sortable: false,
      },
      {
        key: 'title',
        sortable: false,
      },
      {
        key: 'work_email',
        sortable: false,
      },
      {
        key: 'salary',
        sortable: false,
      },
    ],
    employees: [],
  },
  computed: {
    credentialsAdded() {
      const vm = this

      if(vm.access_token){
        return true
      } else {
        return false
      }
    },
    dataToDisplay() {
      const vm = this

      return JSON.stringify(vm.resourceData.data, undefined, 2)
    }
  },
  methods: {
    fetchRequest(record) {
      const vm = this

      vm.requestingResource = true

      fetch(`/${record}/fetch_resource/${vm.access_token}`)
        .then(response => response.json())
        .then((data) => {
          vm.requestingResource = false
          vm.resourceData = data
          vm.resourceData.status = 'success'
          vm.mouldResourceTableItems(data, record)
        })
        .catch((error) => {
          vm.requestingResource = true
          console.error('Error msg:', error);
        })
    },
    getConnectToken(companyName) {
      const vm = this

      vm.submittingConnect = true

      fetch('/connect_tokens/create')
        .then(response => response.json())
        .then((data) => {
          vm.submittingConnect = false
          vm.openAuthenticatorEmbed(data.data.id, companyName) 
        })
        .catch((error) => {
          vm.submittingConnect = false
          console.error('Error msg:', error)
        })
    },
    getAccessToken(publicToken) {
      const vm = this

      fetch(`/public_token/exchange/${publicToken}`)
        .then(response => response.json())
        .then((data) => {
          vm.access_token = data.data.id
        })
        .catch((error) => {
          console.error('Error msg:', error)
        })
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
    },
    onRowSelected(items) {
      console.log('items', items)
    },
    mouldResourceTableItems(data, record){
      const vm = this

      const itemsArray = []

      data.data.forEach((item) => {
        const itemToSave = {
          full_name: item.attributes.first_name + item.attributes.last_name,
          title: item.attributes.title,
          work_email: item.attributes.work_email,
          salary: item.attributes.salary,
        }
        itemsArray.push(itemToSave)
      })

      vm[record] = itemsArray
    },
  },
})

Vue.config.devtools = true
