var fakeData = vueApp.fakeData

var resultsTable = {
  singleBase: (attr) => `<div class="col-sm-10">${attr}</div>`,
  dateBase: (date) => resultsTable.singleBase(new Date(date).toLocaleString('en', { dateStyle: 'short'})),
  arrayBase: (data, attr) => resultsTable.singleBase(data.map((d) => '<span>'+ d[attr] + '</span><br/>').join('')),
  linkBase: (url) => resultsTable.singleBase(`<a href="${url}" target="_blank">Link</a>`),
  arrayComplex: (data, attrs) => `<div class="col-sm-10">${data.map((d) => 
    attrs.map((a, i) =>
      `<div class="row m-0 pt-2 pb-2 ${i % 2 === 0 ? 'bg-light' : 'bg-white'}"><div class="col-sm-2 font-weight-bold">${a}</div>
      ${resultsTable.singleBase(d[a])}</div><hr class="m-0" />`).join('')
      ).join('')
    }`
}

$('.collapse').on('show.bs.collapse', function() {
  var $target = $(this)
  var type = $target.attr('id').replace('-get-panel', '')
  var $button = $('[data-target=\"#' + $target.attr('id') + '\"]')

  setTimeout(function() {
    $target.find('.results-status').text(fakeData[type].status)
    $target.find('.results-data').text(JSON.stringify(fakeData[type].data, undefined, 2))
    $target.find('.panel-loader').hide()
    $target.find('.panel-results').removeClass('d-none')
    populateTable(type, fakeData[type].data)
  }, 1000)
})

$('.collapse').on('hidden.bs.collapse', function() {
  var $target = $(this)
  var type = $target.attr('id').replace('-get-panel', '')
  $target.find('.' + type + '-table > .row > .col-sm-10').remove()
  $target.find('.panel-results').addClass('d-none')
  $target.find('.panel-loader').show()
})

function populateTable(type, data) {
  if (type === 'employees') populateEmployeesTable(data)
  if (type === 'jobs') populateJobsTable(data)
  if (type === 'hires') populateHiresTable(data)
  if (type === 'orgs') populateOrgsTable(data)
  if (type === 'payrolls') populatePayrollTable(data)
}

function populateEmployeesTable(data) {
  var $table = $('.employees-table')
  data.forEach(function(d) {
    $table.find('.employees-id').append(resultsTable.singleBase(d.id))
    $table.find('.employees-first_name').append(resultsTable.singleBase(d.attributes.first_name))
    $table.find('.employees-last_name').append(resultsTable.singleBase(d.attributes.last_name))
    $table.find('.employees-title').append(resultsTable.singleBase(d.attributes.title))
    $table.find('.employees-start_date').append(resultsTable.dateBase(d.attributes.start_date))
    $table.find('.employees-end_date').append(resultsTable.dateBase(d.attributes.end_date))
    $table.find('.employees-manager').append(resultsTable.singleBase(d.attributes.manager))
    $table.find('.employees-date_of_birth').append(resultsTable.dateBase(d.attributes.date_of_birth))
    $table.find('.employees-work_email').append(resultsTable.singleBase(d.attributes.work_email))
  })
  $table.removeClass('d-none')
}

function populateJobsTable(data) {
  var $table = $('.jobs-table')
  data.forEach(function(d) {
    $table.find('.jobs-id').append(resultsTable.singleBase(d.id))
    $table.find('.jobs-location').append(resultsTable.singleBase(d.attributes.location))
    $table.find('.jobs-description_html').append(resultsTable.singleBase(d.attributes.description_html))
    $table.find('.jobs-description_text').append(resultsTable.singleBase(d.attributes.description_text))
    $table.find('.jobs-remote').append(resultsTable.singleBase(d.attributes.remote))
    $table.find('.jobs-name').append(resultsTable.singleBase(d.attributes.name))
    $table.find('.jobs-created_on').append(resultsTable.dateBase(d.attributes.created_on))
  })
  $table.removeClass('d-none')
}

function populateHiresTable(data) {
  var $table = $('.hires-table')
  data.forEach(function(d) {
    $table.find('.hires-id').append(resultsTable.singleBase(d.id))
    $table.find('.hires-name').append(resultsTable.singleBase(d.name))
    $table.find('.hires-role').append(resultsTable.singleBase(d.role))
    $table.find('.hires-status').append(resultsTable.singleBase(d.status))
    $table.find('.hires-resume').append(resultsTable.linkBase(d.resume))
    $table.find('.hires-date').append(resultsTable.dateBase(d.date))
  })
  $table.removeClass('d-none')
}

function populateOrgsTable(data) {
  var $table = $('.orgs-table')
  $table.find('.orgs-manager').append(resultsTable.singleBase(data.manager))
  $table.find('.orgs-team-id').append(resultsTable.singleBase(data.team_id))
  $table.find('.orgs-headcount').append(resultsTable.singleBase(data.headcount))
  $table.removeClass('d-none')
}

function populatePayrollTable(data) {
  var $table = $('.payrolls-table')
  data.forEach(function(d) {
    $table.find('.payroll-id').append(resultsTable.singleBase(d.id))
    $table.find('.payroll-check_date').append(resultsTable.dateBase(d.check_date))
    $table.find('.payroll-pay_period_end_date').append(resultsTable.dateBase(d.pay_period_end_date))
    $table.find('.payroll-pay_period_start_date').append(resultsTable.dateBase(d.pay_period_start_date))
  })
  $table.removeClass('d-none')
}
