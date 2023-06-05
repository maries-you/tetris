function store() {
    const username = document.getElementById('name')
    localStorage['tetris.username'] = username.value;
}