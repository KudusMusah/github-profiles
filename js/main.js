var clientId = "f2ce9077f266e1a19748"
var clientSecret = "1c1683fc9ea8ff728f1e48449626151e394e038c"

$(document).ready(function () {
    $("#searchTerm").on('keyup', function (e) {
        let username = e.target.value;
        if (e.target.value != "") {
            $.ajax({
                url: "https://api.github.com/users/" + username,
                dataType: 'json',
                headers: {
                    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                }
            }).done(function (user) {
                $.ajax({
                    url: "https://api.github.com/users/" + username + "/repos",
                    dataType: 'json',
                    data: {
                        sort: 'created: asc',
                        per_page: 5
                    },
                    headers: {
                        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                    }
                }).done(function (repos) {
                    $.each(repos, function (index, repo) {
                        $("#repos").append(
                            `
                       <div class="card shadow-sm mt-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <strong>${repo.name}</strong> : ${repo.description}
                                    </div>

                                    <div class="col-md-4">
                                        <span class="badge bg-primary">Forks: ${repo.forks_count}</span>
                                        <span class="badge bg-success">Watchers: ${repo.watchers_count}</span>
                                        <span class="badge bg-info">Stars: ${repo.stargazers_count}</span>
                                    </div>

                                    <div class="col-md-2 text-center">
                                        <a href="${repo.html_url}" target="_blank" class="btn btn-danger">View Repo</a>
                                    </div>
                                </div>
                            </div>
                       </div>
                        
                        `
                        )
                    })
                })
                $("#content").html(
                    `
            <div class="card shadow-sm">
                <div class="card-header">
                    ${user.name}
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="thumbnail user_image" src="${user.avatar_url}" alt="profile_image">
                            <div class="d-grid  mt-3">
                                <a class="btn btn-danger btn-block mb-2" target="_blank" href="${user.html_url}">View Profile</a>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <span class="badge bg-dark">Public repos: ${user.public_repos}</span>
                            <span class="badge bg-primary">Private repos: ${user.public_gists}</span>
                            <span class="badge bg-success">Followers: ${user.followers}</span>
                            <span class="badge bg-info">Following: ${user.following}</span>

                            <ul class="list-group mt-4">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            <h1 class="repo_title mt-4">Lastest Repos</h1>
            <hr>
            <div id="repos" class="mt-3"></div>
            `
                )
            }).fail(function () {
                $('#content').html(
                    `
                <div class="text-center mt-5">
                    <img style="width:100px;" src="images/error.png" alt="error image">
                </div>
                <h1 class="repo_title mt-4 text-center">User Not found</h1>
                `
                );
            });
        }

    })
})