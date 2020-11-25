export function fetchResource(record) {
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
}
export function fetchChildRecords(item) {
  const vm = this

  switch (item.record) {
    case 'jobs': {

      return
    }
  }
}
export function fetchJobDetails() {
  const vm = this

  vm.fetchingDetails = true
  vm.selectedJobId = vm.selectedItem.id

  fetch(`/show_job/${vm.selectedJobId}`)
    .then(response => response.json())
    .then((data) => {
      vm.fetchedJobDetails = data
      vm.fetchingDetails = false
    })
    .catch((error) => {
      console.error('Error msg:', error)
    })
}
export function fetchJobCandidates() {
  const vm = this

  vm.fetchingDetails = true
  vm.selectedCandidateId = vm.selectedItem.id

  fetch(`/get_candidates/${vm.selectedCandidateId}`)
    .then(response => response.json())
    .then((data) => {
      vm.mouldResourceTableItems(data, 'candidates')
      vm.fetchingDetails = false
    })
    .catch((error) => {
      console.error('Error msg:', error)
    })
}
export function fetchCandidateDetails() {
  const vm = this

  vm.fetchingDetails = true

  fetch(`/jobs/${vm.selectedJobId}/candidates/${vm.selectedCandidateId}/get`)
    .then(response => response.json())
    .then((data) => {
      vm.fetchedCandidateDetails = data
      vm.fetchingDetails = false
    })
    .catch((error) => {
      console.error('Error msg:', error)
    })
}
