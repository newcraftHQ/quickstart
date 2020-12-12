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
export function onPanelRowSelected(items) {
  const vm = this

  vm.panelTableItemSelected = items[0]

  vm.$refs['large-modal'].show()
}
export function mouldModalResourceTableItems(data) {
  const vm = this

  const itemsArray = []

  data.data.forEach((item) => {
    vm.buildModalFieldsArray(item)

    let itemToSave = {}

    itemToSave.id = item.id

    let myIndexArray = [...Array(4).keys()]

    myIndexArray.forEach((x) => {
      itemToSave[vm.modalTableFields[x]['key']] = item.attributes[vm.modalTableFields[x]['key']]
    })

    itemsArray.push(itemToSave)
  })

  vm.showTableItems = itemsArray
}
export function buildModalFieldsArray(object) {
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

  vm.modalTableFields = fieldsArray
}
export function onModalRowSelected(items) {
  const vm = this

  vm.modalTableItemSelected = items[0]

  vm.$refs['small-modal'].show()
}
export function onShowRowSelected(items) {
  const vm = this

  vm.showTableItemSelected = items[0]

  vm.$refs['small-modal'].show()
}
export function swapTab(record) {
  const vm = this

  vm.recordType = record

  const recordModal = record + 'Modal'
  vm[recordModal] = true

  vm.resourceData = null

  switch (record) {
    case 'jobs': {
      vm.employeesModal = false
      vm.payrollsModal = false
      vm.orgsModal = false

      return
    }
    case 'employees': {
      vm.jobsModal = false
      vm.payrollsModal = false
      vm.orgsModal = false

      return
    }
    case 'payrolls': {
      vm.jobsModal = false
      vm.employeesModal = false
      vm.orgsModal = false

      return
    }
    case 'orgs': {
      vm.jobsModal = false
      vm.employeesModal = false
      vm.payrollsModal = false

      return
    }
  }
}
