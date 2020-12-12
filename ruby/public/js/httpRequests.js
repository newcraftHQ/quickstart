export function fetchResource(record) {
  const vm = this

  vm.requestingResource = true

  fetch(`/${record}/fetch_resource/${vm.access_token}`)
    .then(response => response.json())
    .then((data) => {
      vm.requestingResource = false
      vm.resourceData = data
      vm.resourceData.status = 'success'
      vm.mouldPanelResourceTableItems(data, record)
    })
    .catch((error) => {
      vm.requestingResource = true
      console.error('Error msg:', error);
    })
}
export function fetchShowDetails(record, record_id) {
  const vm = this

  return fetch(`/show_record/${record}/${record_id}`)
    .then(response => response.json())
    .then((data) => {
      return Promise.resolve(data)
    })
    .catch((error) => {
      console.error(`Error fetching ${record} with id: ${record_id}`, error)
    })
}
export function fetchSecondaryDetails(record, record_id, secondary_record) {
  const vm = this

  return fetch(`/${record}/fetch_secondary_resource/${record_id}/${secondary_record}/${vm.access_token}`)
    .then(response => response.json())
    .then((data) => {
      return Promise.resolve(data)
    })
    .catch((error) => {
      console.error(`Error fetching ${secondary_record} from ${record} with id: ${record_id}`, error)
    })
}
