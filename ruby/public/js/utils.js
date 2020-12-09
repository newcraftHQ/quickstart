export function mouldPanelResourceTableItems(data, record) {
  const vm = this

  const itemsArray = []

  data.data.forEach((item) => {
    vm.buildPanelFieldsArray(item)

    let itemToSave = {}

    itemToSave.id = item.id
    itemToSave.record = record

    let myIndexArray = [...Array(4).keys()]

    myIndexArray.forEach((x) => {
      itemToSave[vm.panelTableFields[x]['key']] = item.attributes[vm.panelTableFields[x]['key']]
    })

    itemsArray.push(itemToSave)
  })

  vm.panelTableItems = itemsArray
}
export function onRowSelected(items) {
  const vm = this

  vm.selectedItem = items[0]

  vm.$refs['large-modal'].show()
}
export function onPanelRowSelected(items) {
  const vm = this

  vm.selectedItem = items[0]

  vm.$refs['large-modal'].show()
}
export function onJobSelected() {
  const vm = this

  vm.selectedItem = items[0]

  vm.$refs['large-modal'].show()
}
export function onCandidateSelected(items) {
  const vm = this

  vm.fetchCandidateDetails()

  vm.$refs['small-modal'].show()
}
export function swapTab(record) {
  const vm = this

  const recordModal = record + 'Modal'
  vm[recordModal] = true

  vm.resourceData = null

  switch (record) {
    case 'jobs': {
      vm.employeesModal = false
      vm.payrollsModal = false

      return
    }
    case 'employees': {
      vm.jobsModal = false
      vm.payrollsModal = false

      return
    }
    case 'payrolls': {
      vm.jobsModal = false
      vm.employeesModal = false

      return
    }
  }
}
export function buildPanelFieldsArray(object) {
  const vm = this

  const objKeys = Object.keys(object.attributes)
  const slicedKeys = objKeys.slice(0, 4)

  let fieldsArray = []

  slicedKeys.forEach((item) => {
    const obj = {
      key: item,
      sortable: true,
    }

    fieldsArray.push(obj)
  })

  vm.panelTableFields = fieldsArray
}
