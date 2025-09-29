document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES DE ELEMENTOS DOM ---
    const taskForm = document.getElementById('task-form');
    const formTitle = document.getElementById('form-title');
    const taskIdInput = document.getElementById('task-id');
    const taskNameInput = document.getElementById('task-name');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskDueDateInput = document.getElementById('task-due-date');
    const taskStatusInput = document.getElementById('task-status');
    const taskTableBody = document.getElementById('task-table-body');
    const cancelButton = document.getElementById('btn-cancel');
    const searchInput = document.getElementById('search-task');
    const filterStatus = document.getElementById('filter-status');
    const feedbackMessage = document.getElementById('feedback-message');
    const exportButton = document.getElementById('btn-export-json');
    const printButton = document.getElementById('btn-print');

    // --- ESTADO DA ORDENAÇÃO ---
    let currentSortColumn = null;
    let isAscending = true;

    // --- FUNÇÕES DE MANIPULAÇÃO DO LOCALSTORAGE ---
    const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];
    const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

    // --- FUNÇÕES DE RENDERIZAÇÃO E FEEDBACK ---
    const showFeedback = (message, type) => {
        feedbackMessage.textContent = message;
        feedbackMessage.className = type;
        feedbackMessage.style.display = 'block';
        setTimeout(() => { feedbackMessage.style.display = 'none'; }, 3000);
    };

    const renderTasks = (tasksToDisplay) => {
        taskTableBody.innerHTML = '';
        if (tasksToDisplay.length === 0) {
            taskTableBody.innerHTML = '<tr><td colspan="5">Nenhuma tarefa encontrada.</td></tr>';
            return;
        }
        tasksToDisplay.forEach((task) => {
            const originalIndex = getTasks().findIndex(t => t.id === task.id);
            const row = document.createElement('tr');
            const dueDate = new Date(task.dueDate);
            const formattedDate = dueDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>${formattedDate}</td>
                <td>${task.status}</td>
                <td>
                    <button class="btn-edit" onclick="prepareEdit(${originalIndex})">Editar</button>
                    <button class="btn-delete" onclick="deleteTask(${originalIndex})">Deletar</button>
                </td>
            `;
            taskTableBody.appendChild(row);
        });
    };

    const displayFilteredTasks = () => {
        const allTasks = getTasks();
        const searchTerm = searchInput.value.toLowerCase();
        const statusFilter = filterStatus.value;
        
        let filteredTasks = allTasks.filter(task => {
            const matchesSearch = task.name.toLowerCase().includes(searchTerm) || task.description.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'Todos' || task.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        if (currentSortColumn) {
            filteredTasks.sort((a, b) => {
                const valA = a[currentSortColumn];
                const valB = b[currentSortColumn];
                let comparison = 0;
                if (currentSortColumn === 'dueDate') {
                    comparison = new Date(valA) - new Date(valB);
                } else {
                    comparison = valA.localeCompare(valB);
                }
                return isAscending ? comparison : -comparison;
            });
        }
        
        renderTasks(filteredTasks);
        updateSortIndicators();
    };
    
    const updateSortIndicators = () => {
        document.querySelectorAll('.sortable').forEach(th => {
            const span = th.querySelector('span');
            if (th.dataset.sort === currentSortColumn) {
                span.textContent = isAscending ? ' ▲' : ' ▼';
            } else {
                span.textContent = '';
            }
        });
    };

    // --- FUNÇÕES CRUD E MANIPULAÇÃO DO FORMULÁRIO ---
    const resetForm = () => {
        taskForm.reset();
        taskIdInput.value = '';
        formTitle.textContent = 'Adicionar Nova Tarefa';
        cancelButton.classList.add('hidden');
    };

    window.prepareEdit = (index) => {
        const tasks = getTasks();
        const task = tasks[index];
        taskIdInput.value = index;
        taskNameInput.value = task.name;
        taskDescriptionInput.value = task.description;
        taskDueDateInput.value = task.dueDate;
        taskStatusInput.value = task.status;
        formTitle.textContent = 'Editando Tarefa';
        cancelButton.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.deleteTask = (index) => {
        if (confirm('Tem certeza de que deseja deletar esta tarefa?')) {
            const tasks = getTasks();
            tasks.splice(index, 1);
            saveTasks(tasks);
            displayFilteredTasks();
            resetForm();
        }
    };

    // --- FUNÇÕES DE EXPORTAÇÃO E IMPRESSÃO ---
    const exportTasksToJSON = () => {
        const tasks = getTasks();
        if (tasks.length === 0) {
            alert('Não há tarefas para exportar.');
            return;
        }
        const jsonString = JSON.stringify(tasks, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tarefas.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // --- EVENT LISTENERS ---
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (taskNameInput.value.trim() === '' || taskDueDateInput.value === '') {
            alert('Por favor, preencha o Nome da Tarefa e a Data de Vencimento.');
            return;
        }
        const tasks = getTasks();
        const taskId = taskIdInput.value;
        const taskData = {
            id: taskId ? tasks[taskId].id : Date.now(),
            name: taskNameInput.value,
            description: taskDescriptionInput.value,
            dueDate: taskDueDateInput.value,
            status: taskStatusInput.value,
        };
        if (taskId) {
            tasks[taskId] = taskData;
            showFeedback('Tarefa atualizada com sucesso!', 'success');
        } else {
            tasks.push(taskData);
            showFeedback('Tarefa adicionada com sucesso!', 'success');
        }
        saveTasks(tasks);
        displayFilteredTasks();
        resetForm();
    });

    cancelButton.addEventListener('click', resetForm);
    searchInput.addEventListener('input', displayFilteredTasks);
    filterStatus.addEventListener('change', displayFilteredTasks);
    exportButton.addEventListener('click', exportTasksToJSON);
    printButton.addEventListener('click', () => window.print());

    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            if (currentSortColumn === column) {
                isAscending = !isAscending;
            } else {
                currentSortColumn = column;
                isAscending = true;
            }
            displayFilteredTasks();
        });
    });

    // --- INICIALIZAÇÃO ---
    displayFilteredTasks();
});