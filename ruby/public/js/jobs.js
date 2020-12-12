export function showJob() {
  const vm = this

  vm.fetchShowDetails(vm.recordType, vm.panelTableItemSelected.id)
}
export function fetchCandidates(secondaryRecordType) {
  const vm = this

  vm.fetchingDetails = true

  vm.fetchSecondaryDetails(vm.recordType, vm.panelTableItemSelected.id, secondaryRecordType)
    .then((data) => {
      vm.fetchingDetails = false
      vm.mouldModalResourceTableItems(data)
    })
}