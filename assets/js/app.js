async function fetchOrgs() {
    var base_url = window.location.origin;
    const orgsHtml = await axios.get(base_url + '/api/orgs');
    $("orgs").html(orgsHtml.data);
}

async function fetchArtifacts(org) {

    $('#table').bootstrapTable('destroy');
    $("#totalSize").hide();

    var base_url = window.location.origin;
    var artifactsHtml = await axios.get(base_url + '/api/artifacts/?org=' + org)

    $("#table").bootstrapTable({
        data: artifactsHtml.data.artifacts,
        pagination: true,
        paginationVAlign: 'both',
        pageSize: 10,
        search: false,
        sorting: true,
        sortName: 'size',
        sortOrder: 'desc',
        columns: [
        {
            field: 'repoOwnerLogin',
            title: 'Owner',
            sortable: true,
            formatter: function(value, row, index) {
                return '<a target="_blank" href="' + row.repoOwnerUrl + '">' + value + '</a> <span style="font-style: italic;">(' + row.repoOwnerType + ')</span>';  
            }
        },
            {
            field: 'repoName',
            title: 'Repository',
            sortable: true,
            formatter: function (value, row, index) {
                return '<a target="_blank" href="' + row.repoUrl + '">' + value + '</a> <span style="font-style: italic;">(' + row.repoVisibility + ')</span>';
            }
        }, {
            field: 'artifactName',
            title: 'Artifact',
            sortable: true,
            formatter: function (value, row, index) {
                return '<a target="_blank" href="' + row.artifactDownloadUrl + '">' + value + '</a>';
            }
        }, {
            field: 'workflowRunId',
            title: 'Workflow Run',
            sortable: true,
            formatter: function (value, row, index) {
                return '<a target="_blank" href="' + row.workflowRunUrl + '">' + value + '</a>';
            }
        }, {
            field: 'size',
            title: 'Size',
            sortable: true,
            formatter: function (value, row, index) {
                return prettyBytes(value);
            }
        }, {
            field: 'created_at',
            title: 'Created',
            sortable: true,
            formatter: function (value, row, index) {
                return new Date(value).toLocaleString();
            }
        }, {
            field: 'expires_at',
            title: 'Expires',
            sortable: true,
            formatter: function (value, row, index) {
                return new Date(value).toLocaleString();
            }
        }]
    });

    $("#totalSize").html('<div class="alert alert-success" role="alert">Total size : ' + prettyBytes(artifactsHtml.data.totalSize) + '</div>');
    $("#totalSize").show();

}

window.onload = function() {
    fetchOrgs();
}