/* =====================================================================
   Dəftər — Student Management System
   Полностью автономное приложение: HTML + CSS + JS, данные в localStorage.
   Ничего скачивать не нужно — просто открыть index.html в браузере.
===================================================================== */

/* ---------------------------- CONSTANTS ---------------------------- */

const SUBJECTS = [
  "Русский язык", "Литература", "Английский язык", "Азербайджанский язык",
  "Математика", "Физика", "Биология", "История Азербайджана",
  "Всеобщая история", "Физическая культура", "Изобразительное искусство",
  "Музыка", "География", "Информатика", "Химия"
];

const SUBJECT_COLORS = {
  "Русский язык": "#9c3141", "Литература": "#b3661f", "Английский язык": "#1f6f8b",
  "Азербайджанский язык": "#2c6b4c", "Математика": "#213764", "Физика": "#5b3d8a",
  "Биология": "#3c7a3f", "История Азербайджана": "#a06a0e", "Всеобщая история": "#7c5a44",
  "Физическая культура": "#c9622a", "Изобразительное искусство": "#b5468a",
  "Музыка": "#2a8a8a", "География": "#2f7d5e", "Информатика": "#2b4c7e", "Химия": "#7a8a2b"
};

const AVATAR_PALETTE = ["#213764", "#9c3141", "#2c6b4c", "#a06a0e", "#5b3d8a", "#1f6f8b", "#b5468a", "#2b4c7e"];

const WEEKDAYS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const NAV_ICONS = {
  overview: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>',
  students: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke="currentColor" stroke-width="1.8"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="8" r="2.4" stroke="currentColor" stroke-width="1.6"/><path d="M15.5 14.3c2.6.3 4.5 2.4 4.5 5.7" stroke="currentColor" stroke-width="1.6"/></svg>',
  schedule: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M3 9.5h18M8 3v3M16 3v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  grades: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 19V6a1 1 0 0 1 1-1h8l7 7v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" stroke="currentColor" stroke-width="1.8"/><path d="M13 5v6h7" stroke="currentColor" stroke-width="1.8"/></svg>',
  homework: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.8"/><path d="M9 13h6M9 17h6M9 9h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  attendance: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 12.5l2.3 2.3L15.5 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  classmates: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="9" r="2.4" stroke="currentColor" stroke-width="1.5"/><path d="M2.5 20c0-3.3 2.5-5.7 5.5-5.7s5.5 2.4 5.5 5.7M14.8 14.8c2.6.2 4.7 2.3 4.7 5.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  profile: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 20c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" stroke="currentColor" stroke-width="1.8"/></svg>'
};

/* ---------------------------- STORAGE ---------------------------- */

const DB = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
};

function seed() {
  let users = DB.get("sms_users", null);
  if (!users) {
    users = [
      { id: "u_admin", login: "admin", password: "admin2026", role: "admin", fullName: "Администратор школы", className: "" }
    ];
    DB.set("sms_users", users);
  }
  if (DB.get("sms_schedule", null) === null) DB.set("sms_schedule", {});
  if (DB.get("sms_grades", null) === null) DB.set("sms_grades", {});
  if (DB.get("sms_homework", null) === null) DB.set("sms_homework", {});
  if (DB.get("sms_attendance", null) === null) DB.set("sms_attendance", {});
}
seed();

/* ---------------------------- STATE ---------------------------- */

const state = {
  session: DB.get("sms_session", null),
  section: "overview",
  selectedStudentId: null,
  selectedClass: null,
  selectedMonth: new Date().toISOString().slice(0, 7),
  attendanceDate: new Date().toISOString().slice(0, 10),
  attendanceSubject: SUBJECTS[0]
};

function uid(prefix) { return (prefix || "id") + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function esc(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function initials(name) { return (name || "?").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase(); }
function hashColor(str, palette) { let h = 0; for (const c of String(str)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return palette[h % palette.length]; }
function fmtDate(d) { const dt = new Date(d + "T00:00:00"); return dt.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" }); }
function monthLabel(m) { const [y, mo] = m.split("-"); return new Date(y, mo - 1, 1).toLocaleDateString("ru-RU", { month: "long", year: "numeric" }); }

function users() { return DB.get("sms_users", []); }
function saveUsers(u) { DB.set("sms_users", u); }
function students() { return users().filter(u => u.role === "student"); }
function getUser(id) { return users().find(u => u.id === id); }
function classesFromUsers() { return [...new Set(students().map(s => s.className).filter(Boolean))].sort(); }

function schedule() { return DB.get("sms_schedule", {}); }
function saveSchedule(s) { DB.set("sms_schedule", s); }
function grades() { return DB.get("sms_grades", {}); }
function saveGrades(g) { DB.set("sms_grades", g); }
function homework() { return DB.get("sms_homework", {}); }
function saveHomework(h) { DB.set("sms_homework", h); }
function attendance() { return DB.get("sms_attendance", {}); }
function saveAttendance(a) { DB.set("sms_attendance", a); }

function studentAvg(studentId, subject) {
  const g = grades()[studentId]?.[subject];
  if (!g || !g.length) return null;
  return g.reduce((a, b) => a + Number(b.value), 0) / g.length;
}
function studentOverallAvg(studentId) {
  const subs = SUBJECTS.map(s => studentAvg(studentId, s)).filter(v => v !== null);
  if (!subs.length) return null;
  return subs.reduce((a, b) => a + b, 0) / subs.length;
}
function avgColor(avg) {
  if (avg === null) return "var(--slate-300)";
  if (avg >= 80) return "var(--green-700)";
  if (avg >= 60) return "var(--gold-600)";
  return "var(--red-700)";
}

/* ---------------------------- AUTH ---------------------------- */

const loginView = document.getElementById("loginView");
const appShell = document.getElementById("appShell");

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const login = document.getElementById("loginInput").value.trim();
  const pass = document.getElementById("passwordInput").value;
  const user = users().find(u => u.login.toLowerCase() === login.toLowerCase() && u.password === pass);
  const err = document.getElementById("loginError");
  if (!user) { err.textContent = "Неверный логин или пароль. Попробуйте снова."; return; }
  err.textContent = "";
  state.session = user.id;
  DB.set("sms_session", user.id);
  document.getElementById("loginForm").reset();
  boot();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  state.session = null;
  localStorage.removeItem("sms_session");
  boot();
});

document.getElementById("burgerBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

function currentUser() { return state.session ? getUser(state.session) : null; }

/* ---------------------------- NAV CONFIG ---------------------------- */

const ADMIN_NAV = [
  { id: "overview", label: "Обзор" },
  { id: "students", label: "Ученики" },
  { id: "schedule", label: "Расписание" },
  { id: "grades", label: "Оценки · МСО" },
  { id: "homework", label: "Домашние задания" },
  { id: "attendance", label: "Посещаемость" }
];
const STUDENT_NAV = [
  { id: "profile", label: "Мой профиль" },
  { id: "schedule", label: "Расписание" },
  { id: "grades", label: "Оценки · МСО" },
  { id: "homework", label: "Домашние задания" },
  { id: "attendance", label: "Посещаемость" },
  { id: "classmates", label: "Одноклассники" }
];

function boot() {
  const user = currentUser();
  if (!user) {
    loginView.classList.remove("hidden");
    appShell.classList.add("hidden");
    return;
  }
  loginView.classList.add("hidden");
  appShell.classList.remove("hidden");
  state.section = user.role === "admin" ? "overview" : "profile";
  render();
}

/* ---------------------------- RENDER SHELL ---------------------------- */

function render() {
  const user = currentUser();
  if (!user) return boot();
  const nav = user.role === "admin" ? ADMIN_NAV : STUDENT_NAV;

  document.getElementById("miniProfile").innerHTML = `
    <div class="mini-avatar" style="background:${user.role === 'admin' ? 'var(--gold-500)' : hashColor(user.fullName, AVATAR_PALETTE)}; color:${user.role === 'admin' ? 'var(--navy-950)' : '#fff'}">${initials(user.fullName)}</div>
    <div class="mini-info">
      <div class="mini-name">${esc(user.fullName)}</div>
      <div class="mini-role">${user.role === "admin" ? "Администратор" : "Ученик · " + esc(user.className || "—")}</div>
    </div>`;

  document.getElementById("sideNav").innerHTML = `
    <div class="nav-section-label">${user.role === "admin" ? "Панель управления" : "Дневник"}</div>
    ${nav.map(n => `<button class="nav-item ${state.section === n.id ? "active" : ""}" data-nav="${n.id}">${NAV_ICONS[n.id]}<span>${n.label}</span></button>`).join("")}
  `;
  document.querySelectorAll("[data-nav]").forEach(b => b.addEventListener("click", () => {
    state.section = b.dataset.nav;
    document.getElementById("sidebar").classList.remove("open");
    render();
  }));

  const activeLabel = nav.find(n => n.id === state.section)?.label || "";
  document.getElementById("pageTitle").textContent = activeLabel;
  document.getElementById("todayChip").textContent = new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" });

  const content = document.getElementById("content");
  if (user.role === "admin") {
    const map = { overview: renderOverviewAdmin, students: renderStudents, schedule: renderScheduleAdmin, grades: renderGradesAdmin, homework: renderHomeworkAdmin, attendance: renderAttendanceAdmin };
    content.innerHTML = (map[state.section] || renderOverviewAdmin)();
  } else {
    const map = { profile: renderProfileStudent, schedule: renderScheduleStudent, grades: renderGradesStudent, homework: renderHomeworkStudent, attendance: renderAttendanceStudent, classmates: renderClassmates };
    content.innerHTML = (map[state.section] || renderProfileStudent)();
  }
  bindSectionEvents(user);
}

/* ---------------------------- TOAST ---------------------------- */
function toast(msg) {
  const t = document.getElementById("toast");
  t.innerHTML = `<span class="dot"></span>${esc(msg)}`;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------------------------- MODAL ---------------------------- */
function openModal(html) {
  const wrap = document.createElement("div");
  wrap.className = "modal-overlay";
  wrap.id = "modalOverlay";
  wrap.innerHTML = `<div class="modal">${html}</div>`;
  wrap.addEventListener("click", e => { if (e.target === wrap) closeModal(); });
  document.body.appendChild(wrap);
}
function closeModal() { document.getElementById("modalOverlay")?.remove(); }

/* ============================================================
   ADMIN: OVERVIEW
============================================================ */
function renderOverviewAdmin() {
  const st = students();
  const classes = classesFromUsers();
  const allAvgs = st.map(s => studentOverallAvg(s.id)).filter(v => v !== null);
  const schoolAvg = allAvgs.length ? (allAvgs.reduce((a, b) => a + b, 0) / allAvgs.length) : null;
  const pendingHw = Object.values(homework()).flatMap(bySub => Object.values(bySub).flat()).filter(h => h.grade === null || h.grade === undefined).length;

  const classRows = classes.map(c => {
    const inClass = st.filter(s => s.className === c);
    const avgs = inClass.map(s => studentOverallAvg(s.id)).filter(v => v !== null);
    const avg = avgs.length ? avgs.reduce((a, b) => a + b, 0) / avgs.length : null;
    return { c, count: inClass.length, avg };
  });

  return `
    <p class="page-lede">Общая картина по школе: ученики, классы, средний балл МСО и незакрытые домашние задания.</p>
    <div class="grid grid-4" style="margin-bottom:24px;">
      <div class="card stat-card"><div class="stripe"></div><div class="stat-label">Учеников</div><div class="stat-value">${st.length}</div><div class="stat-foot">во всех классах</div></div>
      <div class="card stat-card"><div class="stripe" style="background:var(--navy-800)"></div><div class="stat-label">Классов</div><div class="stat-value">${classes.length}</div><div class="stat-foot">активных групп</div></div>
      <div class="card stat-card"><div class="stripe" style="background:var(--green-700)"></div><div class="stat-label">Средний балл МСО</div><div class="stat-value">${schoolAvg !== null ? schoolAvg.toFixed(1) : "—"}</div><div class="stat-foot">по школе, из 100</div></div>
      <div class="card stat-card"><div class="stripe" style="background:var(--red-700)"></div><div class="stat-label">Незакрытых ДЗ</div><div class="stat-value">${pendingHw}</div><div class="stat-foot">ожидают оценки</div></div>
    </div>
    <div class="grid grid-2">
      <div class="card">
        <div class="card-head"><h3>Классы школы</h3><span class="card-sub">${classes.length} групп</span></div>
        ${classRows.length ? `<table><thead><tr><th>Класс</th><th>Учеников</th><th>Средний балл</th></tr></thead><tbody>
          ${classRows.map(r => `<tr><td><b>${esc(r.c)}</b></td><td class="text-muted">${r.count}</td><td>${r.avg !== null ? `<span class="badge" style="background:${avgColor(r.avg)}22;color:${avgColor(r.avg)}">${r.avg.toFixed(1)}</span>` : `<span class="text-muted">нет данных</span>`}</td></tr>`).join("")}
        </tbody></table>` : emptyState("Классов пока нет", "Добавьте первого ученика, чтобы появился класс.")}
      </div>
      <div class="card">
        <div class="card-head"><h3>Предметы</h3><span class="card-sub">${SUBJECTS.length}</span></div>
        <div style="display:flex; flex-direction:column; gap:8px; max-height:340px; overflow-y:auto;">
          ${SUBJECTS.map(s => `<div style="display:flex; align-items:center; gap:10px; font-size:13.5px;"><span class="attendance-dot" style="background:${SUBJECT_COLORS[s]}"></span>${s}</div>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function emptyState(title, sub) {
  return `<div class="empty-state">
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none"><path d="M4 19V6a1 1 0 0 1 1-1h8l7 7v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" stroke="currentColor" stroke-width="1.4"/></svg>
    <h4>${esc(title)}</h4><p>${esc(sub)}</p>
  </div>`;
}

/* ============================================================
   ADMIN: STUDENTS
============================================================ */
function renderStudents() {
  const st = students().sort((a, b) => a.fullName.localeCompare(b.fullName, "ru"));
  return `
    <p class="page-lede">Учётные записи учеников. У каждого — свой логин и пароль для входа в дневник.</p>
    <div class="card">
      <div class="card-head">
        <h3>Все ученики <span class="card-sub" style="font-weight:400;">(${st.length})</span></h3>
        <button class="btn btn-gold btn-sm" id="addStudentBtn">+ Добавить ученика</button>
      </div>
      ${st.length ? `<table><thead><tr><th>Ученик</th><th>Класс</th><th>Логин</th><th>Средний балл</th><th></th></tr></thead><tbody>
        ${st.map(s => {
          const avg = studentOverallAvg(s.id);
          return `<tr>
            <td><div class="row-name"><div class="avatar-sm" style="background:${hashColor(s.fullName, AVATAR_PALETTE)}">${initials(s.fullName)}</div><span class="n">${esc(s.fullName)}</span></div></td>
            <td>${esc(s.className || "—")}</td>
            <td class="mono text-muted">${esc(s.login)}</td>
            <td>${avg !== null ? `<span class="badge" style="background:${avgColor(avg)}22;color:${avgColor(avg)}">${avg.toFixed(1)}</span>` : `<span class="text-muted">—</span>`}</td>
            <td class="text-right">
              <button class="icon-btn edit" data-edit-student="${s.id}" title="Изменить"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 20l.9-3.6L16 5.4a1.5 1.5 0 0 1 2.1 0l.5.5a1.5 1.5 0 0 1 0 2.1L7.6 19 4 20Z" stroke="currentColor" stroke-width="1.6"/></svg></button>
              <button class="icon-btn" data-del-student="${s.id}" title="Удалить"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.8 12.3a1.5 1.5 0 0 1-1.5 1.4H8.3a1.5 1.5 0 0 1-1.5-1.4L6 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
            </td>
          </tr>`;
        }).join("")}
      </tbody></table>` : emptyState("Учеников пока нет", "Нажмите «Добавить ученика», чтобы создать первую учётную запись.")}
    </div>
  `;
}

function studentFormModal(existing) {
  const classes = classesFromUsers();
  openModal(`
    <h3>${existing ? "Изменить ученика" : "Новый ученик"}</h3>
    <p class="modal-sub">${existing ? "Обновите данные учётной записи." : "Создайте логин и пароль — ученик войдёт под ними в свой дневник."}</p>
    <form id="studentForm">
      <div class="form-row"><label>Полное имя</label><input type="text" id="sfName" required value="${existing ? esc(existing.fullName) : ""}" placeholder="Например, Алиева Лейла"></div>
      <div class="form-grid-2">
        <div class="form-row"><label>Класс</label><input type="text" id="sfClass" list="classList" required value="${existing ? esc(existing.className) : ""}" placeholder="напр. 9-A"></div>
        <datalist id="classList">${classes.map(c => `<option value="${esc(c)}">`).join("")}</datalist>
        <div class="form-row"><label>Логин</label><input type="text" id="sfLogin" required value="${existing ? esc(existing.login) : ""}" placeholder="leyla.aliyeva"></div>
      </div>
      <div class="form-row"><label>Пароль</label><input type="text" id="sfPass" required value="${existing ? esc(existing.password) : ""}" placeholder="Придумайте пароль"></div>
      <p id="sfError" class="login-error"></p>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" id="sfCancel">Отмена</button>
        <button type="submit" class="btn btn-primary">${existing ? "Сохранить" : "Создать"}</button>
      </div>
    </form>
  `);
  document.getElementById("sfCancel").onclick = closeModal;
  document.getElementById("studentForm").onsubmit = e => {
    e.preventDefault();
    const fullName = document.getElementById("sfName").value.trim();
    const className = document.getElementById("sfClass").value.trim();
    const login = document.getElementById("sfLogin").value.trim();
    const password = document.getElementById("sfPass").value.trim();
    const all = users();
    const clash = all.find(u => u.login.toLowerCase() === login.toLowerCase() && u.id !== (existing?.id));
    if (clash) { document.getElementById("sfError").textContent = "Такой логин уже занят, выберите другой."; return; }
    if (existing) {
      const u = all.find(x => x.id === existing.id);
      Object.assign(u, { fullName, className, login, password });
    } else {
      all.push({ id: uid("stu"), role: "student", fullName, className, login, password });
    }
    saveUsers(all);
    closeModal();
    toast(existing ? "Данные ученика обновлены" : "Учётная запись создана");
    render();
  };
}

/* ============================================================
   ADMIN: SCHEDULE
============================================================ */
function renderScheduleAdmin() {
  const classes = classesFromUsers();
  if (!state.selectedClass || !classes.includes(state.selectedClass)) state.selectedClass = classes[0] || null;
  const cls = state.selectedClass;
  const sched = schedule();
  const items = (sched[cls] || []).filter(l => l.date.slice(0, 7) === state.selectedMonth).sort((a, b) => a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date));
  const grouped = {};
  items.forEach(l => { (grouped[l.date] ??= []).push(l); });

  return `
    <p class="page-lede">Расписание уроков по классам, добавляется помесячно — выберите класс и месяц.</p>
    <div class="select-toolbar">
      <div class="form-row"><label>Класс</label><select id="schClassSel">${classes.length ? classes.map(c => `<option ${c === cls ? "selected" : ""}>${esc(c)}</option>`).join("") : `<option>Нет классов</option>`}</select></div>
      <div class="form-row"><label>Месяц</label><input type="month" id="schMonthSel" value="${state.selectedMonth}"></div>
      <button class="btn btn-gold btn-sm" id="addLessonBtn" ${!cls ? "disabled" : ""}>+ Добавить урок</button>
    </div>
    <div class="card">
      <div class="card-head"><h3>${cls ? esc(cls) : "—"} · ${monthLabel(state.selectedMonth)}</h3><span class="card-sub">${items.length} уроков</span></div>
      ${Object.keys(grouped).length ? Object.keys(grouped).sort().map(date => `
        <div class="schedule-day">
          <div class="schedule-day-head"><span class="num">${date.slice(8, 10)}</span><span class="wd">${WEEKDAYS[new Date(date + "T00:00:00").getDay()]}</span></div>
          ${grouped[date].map(l => `
            <div class="lesson-row">
              <span class="lesson-time">${l.time}</span>
              <span class="lesson-dot" style="background:${SUBJECT_COLORS[l.subject] || "#999"}"></span>
              <span class="lesson-subject">${esc(l.subject)}</span>
              <button class="icon-btn" data-del-lesson="${l.id}" title="Удалить"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
            </div>`).join("")}
        </div>`).join("") : emptyState("На этот месяц уроков нет", cls ? "Добавьте первый урок кнопкой выше." : "Сначала добавьте ученика, чтобы появился класс.")}
    </div>
  `;
}

function lessonFormModal(className) {
  openModal(`
    <h3>Новый урок</h3>
    <p class="modal-sub">Класс: <b>${esc(className)}</b></p>
    <form id="lessonForm">
      <div class="form-grid-2">
        <div class="form-row"><label>Дата</label><input type="date" id="lfDate" required value="${state.selectedMonth}-01"></div>
        <div class="form-row"><label>Время</label><input type="time" id="lfTime" required value="09:00"></div>
      </div>
      <div class="form-row"><label>Предмет</label><select id="lfSubject">${SUBJECTS.map(s => `<option>${esc(s)}</option>`).join("")}</select></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" id="lfCancel">Отмена</button>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </div>
    </form>
  `);
  document.getElementById("lfCancel").onclick = closeModal;
  document.getElementById("lessonForm").onsubmit = e => {
    e.preventDefault();
    const date = document.getElementById("lfDate").value;
    const time = document.getElementById("lfTime").value;
    const subject = document.getElementById("lfSubject").value;
    const sched = schedule();
    (sched[className] ??= []).push({ id: uid("les"), date, time, subject });
    saveSchedule(sched);
    state.selectedMonth = date.slice(0, 7);
    closeModal();
    toast("Урок добавлен в расписание");
    render();
  };
}

/* ============================================================
   ADMIN: GRADES / MSO
============================================================ */
function studentPickerRow(idPrefix) {
  const st = students().sort((a, b) => a.fullName.localeCompare(b.fullName, "ru"));
  if (!state.selectedStudentId || !st.find(s => s.id === state.selectedStudentId)) state.selectedStudentId = st[0]?.id || null;
  return `<div class="form-row"><label>Ученик</label><select id="${idPrefix}StudentSel">${st.length ? st.map(s => `<option value="${s.id}" ${s.id === state.selectedStudentId ? "selected" : ""}>${esc(s.fullName)} · ${esc(s.className || "—")}</option>`).join("") : `<option>Нет учеников</option>`}</select></div>`;
}

function subjectGradeCards(studentId, mode) {
  const g = grades()[studentId] || {};
  return `<div class="grid grid-3">
    ${SUBJECTS.map(subj => {
      const list = (g[subj] || []).slice().sort((a, b) => a.date.localeCompare(b.date));
      const avg = studentAvg(studentId, subj);
      const col = avgColor(avg);
      return `<div class="card subject-card">
        <div class="subject-card-head">
          <h4><span class="attendance-dot" style="background:${SUBJECT_COLORS[subj]}"></span> ${subj}</h4>
          <div class="avg-ring" style="background:${avg !== null ? col : "var(--slate-300)"}">${avg !== null ? avg.toFixed(0) : "—"}</div>
        </div>
        <div class="mso-list">
          ${list.length ? list.map(m => `<span class="grade-pill" style="background:${gradeBg(m.value)};color:${gradeFg(m.value)}" title="${esc(m.label)} · ${fmtDate(m.date)}">${m.value}</span>`).join("") : `<span class="text-muted" style="font-size:12.5px;">Оценок пока нет</span>`}
        </div>
        ${mode === "admin" ? `<button class="btn btn-ghost btn-sm" data-add-grade="${subj}">+ Оценка МСО</button>` : ""}
      </div>`;
    }).join("")}
  </div>`;
}
function gradeBg(v) { v = Number(v); return v >= 80 ? "var(--green-100)" : v >= 60 ? "var(--amber-100)" : "var(--red-100)"; }
function gradeFg(v) { v = Number(v); return v >= 80 ? "var(--green-700)" : v >= 60 ? "var(--amber-700)" : "var(--red-700)"; }

function renderGradesAdmin() {
  const st = students();
  if (!st.length) return `<p class="page-lede">Оценки МСО по каждому предмету.</p><div class="card">${emptyState("Учеников пока нет", "Сначала добавьте ученика в разделе «Ученики».")}</div>`;
  const sid = state.selectedStudentId;
  const u = getUser(sid);
  const overall = studentOverallAvg(sid);
  return `
    <p class="page-lede">Малое суммарное оценивание (МСО) по каждому предмету. Средний балл считается автоматически.</p>
    <div class="select-toolbar">${studentPickerRow("g")}
      <div class="card-tight card" style="padding:10px 18px; display:flex; align-items:center; gap:10px;">
        <span class="text-muted" style="font-size:12.5px;">Общий средний балл</span>
        <span class="badge" style="background:${avgColor(overall)}22;color:${avgColor(overall)}; font-size:14px; padding:5px 12px;">${overall !== null ? overall.toFixed(1) : "—"}</span>
      </div>
    </div>
    ${subjectGradeCards(sid, "admin")}
  `;
}

function gradeFormModal(studentId, subject) {
  openModal(`
    <h3>Оценка МСО</h3>
    <p class="modal-sub">${esc(getUser(studentId).fullName)} · <span style="color:${SUBJECT_COLORS[subject]}">${esc(subject)}</span></p>
    <form id="gradeForm">
      <div class="form-grid-2">
        <div class="form-row"><label>Тип</label><select id="gfLabel"><option>МСО 1</option><option>МСО 2</option><option>МСО 3</option><option>Итоговая</option></select></div>
        <div class="form-row"><label>Балл (0–100)</label><input type="number" id="gfValue" min="0" max="100" required value="85"></div>
      </div>
      <div class="form-row"><label>Дата</label><input type="date" id="gfDate" required value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" id="gfCancel">Отмена</button>
        <button type="submit" class="btn btn-primary">Сохранить</button>
      </div>
    </form>
  `);
  document.getElementById("gfCancel").onclick = closeModal;
  document.getElementById("gradeForm").onsubmit = e => {
    e.preventDefault();
    const label = document.getElementById("gfLabel").value;
    const value = Math.max(0, Math.min(100, Number(document.getElementById("gfValue").value)));
    const date = document.getElementById("gfDate").value;
    const g = grades();
    (g[studentId] ??= {}); (g[studentId][subject] ??= []).push({ id: uid("gr"), label, value, date });
    saveGrades(g);
    closeModal();
    toast("Оценка добавлена в журнал");
    render();
  };
}

/* ============================================================
   ADMIN: HOMEWORK
============================================================ */
function renderHomeworkAdmin() {
  const st = students();
  if (!st.length) return `<p class="page-lede">Домашние задания по предметам.</p><div class="card">${emptyState("Учеников пока нет", "Сначала добавьте ученика в разделе «Ученики».")}</div>`;
  const sid = state.selectedStudentId;
  const hw = homework()[sid] || {};
  const subjectsWithHw = SUBJECTS.filter(s => (hw[s] || []).length);
  return `
    <p class="page-lede">Задания, выданные ученику, и оценки за их выполнение.</p>
    <div class="select-toolbar">${studentPickerRow("h")}
      <select id="hwSubjectAdd" class="form-row-inline"></select>
    </div>
    <div class="card">
      <div class="card-head">
        <h3>${esc(getUser(sid)?.fullName || "")}</h3>
        <div style="display:flex; gap:8px;">
          <select id="hwNewSubject">${SUBJECTS.map(s => `<option>${esc(s)}</option>`).join("")}</select>
          <button class="btn btn-gold btn-sm" id="addHwBtn">+ Задание</button>
        </div>
      </div>
      ${subjectsWithHw.length ? subjectsWithHw.map(subj => `
        <div style="margin-bottom:18px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;"><span class="attendance-dot" style="background:${SUBJECT_COLORS[subj]}"></span><b style="font-size:13.5px;">${esc(subj)}</b></div>
          <table><thead><tr><th>Задание</th><th>Срок</th><th>Оценка</th><th></th></tr></thead><tbody>
            ${hw[subj].sort((a,b)=>b.date.localeCompare(a.date)).map(item => `
              <tr>
                <td>${esc(item.title)}</td>
                <td class="mono text-muted">${fmtDate(item.date)}</td>
                <td>${item.grade !== null && item.grade !== undefined ? `<span class="grade-pill" style="background:${gradeBg(item.grade)};color:${gradeFg(item.grade)}">${item.grade}</span>` : `<span class="badge badge-amber">не оценено</span>`}</td>
                <td class="text-right"><button class="icon-btn" data-del-hw="${subj}|${item.id}" title="Удалить"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button></td>
              </tr>`).join("")}
          </tbody></table>
        </div>`).join("") : emptyState("Заданий пока нет", "Выберите предмет и нажмите «Задание», чтобы выдать домашнюю работу.")}
    </div>
  `;
}

function homeworkFormModal(studentId, subject) {
  openModal(`
    <h3>Новое домашнее задание</h3>
    <p class="modal-sub">${esc(getUser(studentId).fullName)} · <span style="color:${SUBJECT_COLORS[subject]}">${esc(subject)}</span></p>
    <form id="hwForm">
      <div class="form-row"><label>Задание</label><input type="text" id="hfTitle" required placeholder="Например, упражнения 12–15"></div>
      <div class="form-grid-2">
        <div class="form-row"><label>Срок сдачи</label><input type="date" id="hfDate" required value="${new Date().toISOString().slice(0,10)}"></div>
        <div class="form-row"><label>Оценка (необязательно)</label><input type="number" id="hfGrade" min="0" max="100" placeholder="—"></div>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" id="hfCancel">Отмена</button>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </div>
    </form>
  `);
  document.getElementById("hfCancel").onclick = closeModal;
  document.getElementById("hwForm").onsubmit = e => {
    e.preventDefault();
    const title = document.getElementById("hfTitle").value.trim();
    const date = document.getElementById("hfDate").value;
    const gradeRaw = document.getElementById("hfGrade").value;
    const grade = gradeRaw === "" ? null : Math.max(0, Math.min(100, Number(gradeRaw)));
    const hw = homework();
    (hw[studentId] ??= {}); (hw[studentId][subject] ??= []).push({ id: uid("hw"), title, date, grade });
    saveHomework(hw);
    closeModal();
    toast("Задание добавлено");
    render();
  };
}

/* ============================================================
   ADMIN: ATTENDANCE
============================================================ */
function renderAttendanceAdmin() {
  const classes = classesFromUsers();
  if (!state.selectedClass || !classes.includes(state.selectedClass)) state.selectedClass = classes[0] || null;
  const cls = state.selectedClass;
  const inClass = students().filter(s => s.className === cls).sort((a,b)=>a.fullName.localeCompare(b.fullName,"ru"));
  const att = attendance();
  const date = state.attendanceDate;
  const subject = state.attendanceSubject;

  const rows = inClass.map(s => {
    const rec = (att[s.id]?.[subject] || []).find(r => r.date === date);
    const present = rec ? rec.present : true;
    return { s, present };
  });

  return `
    <p class="page-lede">Отмечайте, участвовал ли ученик в занятии — присутствие фиксируется по предмету и дате.</p>
    <div class="select-toolbar">
      <div class="form-row"><label>Класс</label><select id="atClassSel">${classes.length ? classes.map(c => `<option ${c===cls?"selected":""}>${esc(c)}</option>`).join("") : `<option>Нет классов</option>`}</select></div>
      <div class="form-row"><label>Предмет</label><select id="atSubjectSel">${SUBJECTS.map(s => `<option ${s===subject?"selected":""}>${esc(s)}</option>`).join("")}</select></div>
      <div class="form-row"><label>Дата</label><input type="date" id="atDateSel" value="${date}"></div>
    </div>
    <div class="card">
      <div class="card-head"><h3>${esc(cls || "—")} · ${esc(subject)}</h3><span class="card-sub">${fmtDate(date)}</span></div>
      ${rows.length ? `<table><thead><tr><th>Ученик</th><th>Статус</th><th class="text-right">Отметить</th></tr></thead><tbody>
        ${rows.map(r => `<tr>
          <td><div class="row-name"><div class="avatar-sm" style="background:${hashColor(r.s.fullName, AVATAR_PALETTE)}">${initials(r.s.fullName)}</div><span class="n">${esc(r.s.fullName)}</span></div></td>
          <td>${r.present ? `<span class="badge badge-green">присутствует</span>` : `<span class="badge badge-red">отсутствует</span>`}</td>
          <td class="text-right">
            <button class="btn btn-sm ${r.present ? "btn-primary" : "btn-ghost"}" data-mark="${r.s.id}|1">Был</button>
            <button class="btn btn-sm ${!r.present ? "btn-danger" : "btn-ghost"}" data-mark="${r.s.id}|0">Не был</button>
          </td>
        </tr>`).join("")}
      </tbody></table>` : emptyState("В этом классе нет учеников", "Добавьте учеников, чтобы отмечать посещаемость.")}
    </div>
  `;
}

function markAttendance(studentId, subject, date, present) {
  const att = attendance();
  (att[studentId] ??= {}); (att[studentId][subject] ??= []);
  const idx = att[studentId][subject].findIndex(r => r.date === date);
  if (idx >= 0) att[studentId][subject][idx].present = present;
  else att[studentId][subject].push({ id: uid("at"), date, present });
  saveAttendance(att);
}

/* ============================================================
   STUDENT: PROFILE
============================================================ */
function renderProfileStudent() {
  const u = currentUser();
  const overall = studentOverallAvg(u.id);
  const classmatesCount = students().filter(s => s.className === u.className && s.id !== u.id).length;
  return `
    <p class="page-lede">Ваша учётная запись и общая успеваемость по всем предметам.</p>
    <div class="grid grid-2" style="margin-bottom:22px;">
      <div class="card" style="display:flex; align-items:center; gap:18px;">
        <div class="mini-avatar" style="width:64px;height:64px;font-size:22px;background:${hashColor(u.fullName, AVATAR_PALETTE)}">${initials(u.fullName)}</div>
        <div>
          <h3 style="font-size:20px;">${esc(u.fullName)}</h3>
          <p class="text-muted" style="margin-top:4px;">Класс ${esc(u.className)} · логин <span class="mono">${esc(u.login)}</span></p>
        </div>
      </div>
      <div class="card stat-card"><div class="stripe" style="background:${avgColor(overall)}"></div>
        <div class="stat-label">Общий средний балл</div>
        <div class="stat-value" style="color:${avgColor(overall)}">${overall !== null ? overall.toFixed(1) : "—"}</div>
        <div class="stat-foot">${classmatesCount} одноклассников в ${esc(u.className)}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><h3>Баллы по предметам</h3><span class="card-sub">среднее по МСО</span></div>
      <div class="grid grid-4">
        ${SUBJECTS.map(s => { const a = studentAvg(u.id, s); return `
          <div class="card-tight" style="border:1px solid var(--line); border-radius:12px; text-align:center;">
            <div class="avg-ring" style="margin:0 auto 8px; background:${a!==null?avgColor(a):"var(--slate-300)"}">${a!==null?a.toFixed(0):"—"}</div>
            <div style="font-size:12px; font-weight:600; color:var(--ink-soft);">${s}</div>
          </div>`; }).join("")}
      </div>
    </div>
  `;
}

/* ============================================================
   STUDENT: SCHEDULE
============================================================ */
function renderScheduleStudent() {
  const u = currentUser();
  const sched = schedule();
  const items = (sched[u.className] || []).filter(l => l.date.slice(0,7) === state.selectedMonth).sort((a,b)=> a.date===b.date? a.time.localeCompare(b.time): a.date.localeCompare(b.date));
  const grouped = {};
  items.forEach(l => { (grouped[l.date] ??= []).push(l); });
  return `
    <p class="page-lede">Расписание уроков вашего класса — ${esc(u.className)}.</p>
    <div class="select-toolbar"><div class="form-row"><label>Месяц</label><input type="month" id="stuMonthSel" value="${state.selectedMonth}"></div></div>
    <div class="card">
      <div class="card-head"><h3>${monthLabel(state.selectedMonth)}</h3><span class="card-sub">${items.length} уроков</span></div>
      ${Object.keys(grouped).length ? Object.keys(grouped).sort().map(date => `
        <div class="schedule-day">
          <div class="schedule-day-head"><span class="num">${date.slice(8,10)}</span><span class="wd">${WEEKDAYS[new Date(date+"T00:00:00").getDay()]}</span></div>
          ${grouped[date].map(l => `<div class="lesson-row"><span class="lesson-time">${l.time}</span><span class="lesson-dot" style="background:${SUBJECT_COLORS[l.subject]||"#999"}"></span><span class="lesson-subject">${esc(l.subject)}</span></div>`).join("")}
        </div>`).join("") : emptyState("На этот месяц уроков нет", "Расписание появится, когда администратор его добавит.")}
    </div>
  `;
}

/* ============================================================
   STUDENT: GRADES / HOMEWORK / ATTENDANCE / CLASSMATES
============================================================ */
function renderGradesStudent() {
  const u = currentUser();
  const overall = studentOverallAvg(u.id);
  return `
    <p class="page-lede">Ваши оценки МСО по каждому предмету, средний балл считается автоматически.</p>
    <div class="select-toolbar">
      <div class="card-tight card" style="padding:10px 18px; display:flex; align-items:center; gap:10px;">
        <span class="text-muted" style="font-size:12.5px;">Общий средний балл</span>
        <span class="badge" style="background:${avgColor(overall)}22;color:${avgColor(overall)}; font-size:14px; padding:5px 12px;">${overall!==null?overall.toFixed(1):"—"}</span>
      </div>
    </div>
    ${subjectGradeCards(u.id, "student")}
  `;
}

function renderHomeworkStudent() {
  const u = currentUser();
  const hw = homework()[u.id] || {};
  const subjectsWithHw = SUBJECTS.filter(s => (hw[s]||[]).length);
  return `
    <p class="page-lede">Домашние задания и оценки за их выполнение.</p>
    <div class="card">
      ${subjectsWithHw.length ? subjectsWithHw.map(subj => `
        <div style="margin-bottom:18px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;"><span class="attendance-dot" style="background:${SUBJECT_COLORS[subj]}"></span><b style="font-size:13.5px;">${esc(subj)}</b></div>
          <table><thead><tr><th>Задание</th><th>Срок</th><th>Оценка</th></tr></thead><tbody>
            ${hw[subj].sort((a,b)=>b.date.localeCompare(a.date)).map(item => `<tr><td>${esc(item.title)}</td><td class="mono text-muted">${fmtDate(item.date)}</td><td>${item.grade!==null&&item.grade!==undefined?`<span class="grade-pill" style="background:${gradeBg(item.grade)};color:${gradeFg(item.grade)}">${item.grade}</span>`:`<span class="badge badge-amber">не оценено</span>`}</td></tr>`).join("")}
          </tbody></table>
        </div>`).join("") : emptyState("Заданий пока нет", "Здесь появятся домашние задания, когда их выдаст учитель.")}
    </div>
  `;
}

function renderAttendanceStudent() {
  const u = currentUser();
  const att = attendance()[u.id] || {};
  const all = SUBJECTS.flatMap(s => (att[s]||[]).map(r => ({...r, subject:s}))).sort((a,b)=>b.date.localeCompare(a.date));
  const total = all.length;
  const presentCount = all.filter(r => r.present).length;
  const pct = total ? Math.round(presentCount/total*100) : null;
  return `
    <p class="page-lede">Ваше участие в занятиях по датам и предметам.</p>
    <div class="grid grid-3" style="margin-bottom:20px;">
      <div class="card stat-card"><div class="stripe" style="background:var(--green-700)"></div><div class="stat-label">Присутствовал</div><div class="stat-value">${presentCount}</div></div>
      <div class="card stat-card"><div class="stripe" style="background:var(--red-700)"></div><div class="stat-label">Отсутствовал</div><div class="stat-value">${total-presentCount}</div></div>
      <div class="card stat-card"><div class="stripe" style="background:var(--gold-500)"></div><div class="stat-label">Посещаемость</div><div class="stat-value">${pct!==null?pct+"%":"—"}</div></div>
    </div>
    <div class="card">
      ${all.length ? `<table><thead><tr><th>Дата</th><th>Предмет</th><th>Статус</th></tr></thead><tbody>
        ${all.map(r => `<tr><td class="mono text-muted">${fmtDate(r.date)}</td><td><span class="attendance-dot" style="background:${SUBJECT_COLORS[r.subject]}"></span> ${esc(r.subject)}</td><td>${r.present?`<span class="badge badge-green">присутствовал</span>`:`<span class="badge badge-red">отсутствовал</span>`}</td></tr>`).join("")}
      </tbody></table>` : emptyState("Записей пока нет", "Отметки о посещаемости появятся здесь после первых занятий.")}
    </div>
  `;
}

function renderClassmates() {
  const u = currentUser();
  const mates = students().filter(s => s.className === u.className && s.id !== u.id).sort((a,b)=>a.fullName.localeCompare(b.fullName,"ru"));
  return `
    <p class="page-lede">Ученики вашего класса — ${esc(u.className)}.</p>
    <div class="grid grid-3">
      ${mates.length ? mates.map(m => { const avg = studentOverallAvg(m.id); return `
        <div class="card" style="display:flex; align-items:center; gap:14px;">
          <div class="mini-avatar" style="background:${hashColor(m.fullName, AVATAR_PALETTE)}">${initials(m.fullName)}</div>
          <div style="flex:1; min-width:0;">
            <div style="font-weight:600; font-size:14px;">${esc(m.fullName)}</div>
            <div class="text-muted" style="font-size:12px;">средний балл: <span style="color:${avgColor(avg)}; font-weight:700;">${avg!==null?avg.toFixed(1):"—"}</span></div>
          </div>
        </div>`; }).join("") : `<div class="card">${emptyState("Одноклассников пока нет", "В вашем классе больше никого не зарегистрировано.")}</div>`}
    </div>
  `;
}

/* ============================================================
   EVENT BINDING (delegated per render)
============================================================ */
function bindSectionEvents(user) {
  // Students
  document.getElementById("addStudentBtn")?.addEventListener("click", () => studentFormModal(null));
  document.querySelectorAll("[data-edit-student]").forEach(b => b.addEventListener("click", () => studentFormModal(getUser(b.dataset.editStudent))));
  document.querySelectorAll("[data-del-student]").forEach(b => b.addEventListener("click", () => {
    if (!confirm("Удалить эту учётную запись ученика без возможности восстановления?")) return;
    saveUsers(users().filter(u => u.id !== b.dataset.delStudent));
    toast("Учётная запись удалена");
    render();
  }));

  // Schedule (admin)
  document.getElementById("schClassSel")?.addEventListener("change", e => { state.selectedClass = e.target.value; render(); });
  document.getElementById("schMonthSel")?.addEventListener("change", e => { state.selectedMonth = e.target.value; render(); });
  document.getElementById("addLessonBtn")?.addEventListener("click", () => lessonFormModal(state.selectedClass));
  document.querySelectorAll("[data-del-lesson]").forEach(b => b.addEventListener("click", () => {
    const sched = schedule();
    sched[state.selectedClass] = (sched[state.selectedClass]||[]).filter(l => l.id !== b.dataset.delLesson);
    saveSchedule(sched);
    render();
  }));

  // Schedule (student)
  document.getElementById("stuMonthSel")?.addEventListener("change", e => { state.selectedMonth = e.target.value; render(); });

  // Grades (admin)
  document.getElementById("gStudentSel")?.addEventListener("change", e => { state.selectedStudentId = e.target.value; render(); });
  document.querySelectorAll("[data-add-grade]").forEach(b => b.addEventListener("click", () => gradeFormModal(state.selectedStudentId, b.dataset.addGrade)));

  // Homework (admin)
  document.getElementById("hStudentSel")?.addEventListener("change", e => { state.selectedStudentId = e.target.value; render(); });
  document.getElementById("addHwBtn")?.addEventListener("click", () => homeworkFormModal(state.selectedStudentId, document.getElementById("hwNewSubject").value));
  document.querySelectorAll("[data-del-hw]").forEach(b => b.addEventListener("click", () => {
    const [subj, id] = b.dataset.delHw.split("|");
    const hw = homework();
    hw[state.selectedStudentId][subj] = hw[state.selectedStudentId][subj].filter(x => x.id !== id);
    saveHomework(hw);
    render();
  }));

  // Attendance (admin)
  document.getElementById("atClassSel")?.addEventListener("change", e => { state.selectedClass = e.target.value; render(); });
  document.getElementById("atSubjectSel")?.addEventListener("change", e => { state.attendanceSubject = e.target.value; render(); });
  document.getElementById("atDateSel")?.addEventListener("change", e => { state.attendanceDate = e.target.value; render(); });
  document.querySelectorAll("[data-mark]").forEach(b => b.addEventListener("click", () => {
    const [sid, val] = b.dataset.mark.split("|");
    markAttendance(sid, state.attendanceSubject, state.attendanceDate, val === "1");
    render();
  }));
}

/* ---------------------------- INIT ---------------------------- */
boot();
