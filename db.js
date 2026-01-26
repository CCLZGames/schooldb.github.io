const DB = {
    load() {
        return JSON.parse(localStorage.getItem("schoolDB") || "{}");
    },

    save(data) {
        localStorage.setItem("schoolDB", JSON.stringify(data));
    },

    resetAll() {
        localStorage.removeItem("schoolDB");
    },

    /* ---------- SCHOOLS ---------- */
    listDatabases() {
        return Object.keys(this.load());
    },

    createDatabase(name) {
        const db = this.load();
        if (!db[name]) {
            db[name] = {
                classes: [],
                users: [],
                attendance: [],
                housePoints: []
            };
            this.save(db);
        }
    },

    deleteDatabase(name) {
        const db = this.load();
        delete db[name];
        this.save(db);
    },

    /* ---------- CLASSES ---------- */
    addClass(school, className) {
        const db = this.load();
        if (!db[school].classes.includes(className)) {
            db[school].classes.push(className);
            this.save(db);
        }
    },

    getClasses(school) {
        return this.load()[school]?.classes || [];
    },

    /* ---------- USERS ---------- */
    addUser(school, user) {
        const db = this.load();
        db[school].users.push(user);
        this.save(db);
    },

    login(school, username, password) {
        return this.load()[school]?.users.find(
            u => u.username === username && u.password === password
        );
    },

    getUsers(school) {
        return this.load()[school]?.users || [];
    },

    /* ---------- ATTENDANCE ---------- */
    recordAttendance(school, record) {
        const db = this.load();
        db[school].attendance.push(record);
        this.save(db);
    },

    getAttendance(school) {
        return this.load()[school]?.attendance || [];
    },

    /* ---------- HOUSE POINTS ---------- */
    addHousePoints(school, record) {
        const db = this.load();
        db[school].housePoints.push(record);
        this.save(db);
    },

    getHousePoints(school) {
        return this.load()[school]?.housePoints || [];
    }
};
