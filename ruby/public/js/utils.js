export function mouldResourceTableItems(data, record) {
  const vm = this

  const itemsArray = []

  switch (record) {
    case 'employees': {
      data.data.forEach((item) => {
        const itemToSave = {
          id: item.id,
          full_name: item.attributes.first_name + ' ' + item.attributes.last_name,
          title: item.attributes.title,
          work_email: item.attributes.work_email,
          salary: item.attributes.salary,
          record: record,
        }
        itemsArray.push(itemToSave)
      })

      vm[record] = itemsArray

      return
    }
    case 'jobs': {
      data.data.forEach((item) => {
        const itemToSave = {
          id: item.id,
          name: item.attributes.name,
          location: item.attributes.location,
          remote: item.attributes.remote,
          status: item.attributes.status,
          record: record,
        }
        itemsArray.push(itemToSave)
      })

      vm[record] = itemsArray

      return
    }
    case 'payrolls': {
      data.data.forEach((item) => {
        const itemToSave = {
          id: item.id,
          check_data: item.attributes.check_data,
          pay_period_end_date: item.attributes.pay_period_end_date,
          pay_period_start_date: item.attributes.pay_period_start_date,
          record: record,
        }
        itemsArray.push(itemToSave)
      })

      vm[record] = itemsArray

      return
    }
    case 'candidates': {
      data.data.forEach((item) => {
        const itemToSave = {
          id: item.id,
          full_name: item.attributes.first_name + ' ' + item.attributes.first_name,
          email: item.attributes.email,
          phone_number: item.attributes.phone_number,
          address: item.attributes.address,
          record: 'candidates',
        }
        itemsArray.push(itemToSave)
      })

      vm[record] = itemsArray

      return
    }
  }
}
export function onRowSelected(items) {
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
