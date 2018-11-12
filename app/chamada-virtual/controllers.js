import {
	Alert,
	AsyncStorage
} from 'react-native';


const qs = require('qs');

const methods = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};
export const url_dev = "http://10.42.0.1:8000/"
export const url_prod = "https://daviwesleyvk.pythonanywhere.com/"

const request = (method, endpoint, options) => {
	const result = new Promise((resolve, reject) => {
		let url = url_dev + endpoint;

		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		};
		if (options.token) {
			headers.Authorization = `Token ${options.token}`;
		}

		let body = null;
		if (method === methods.GET) {
			url += qs.stringify(options.params);
		} else {
			body = JSON.stringify(options.params);
		}

		fetch(url, {
			method,
			headers,
			body,
		}).then((response) => {
			response.json().then((data) => {
				if (response.ok) {
					resolve(data);
				} else {
					reject(data);
				}
			}).catch(() => {
				if (!options.ignoreErrors) {
					Alert.alert('Erro', 'Operação inválida.');
				}
				reject();
			});
		}).catch(() => {
			if (!options.ignoreErrors) {
				Alert.alert('Erro', 'Não foi possível estabelecer uma conexão com o servidor. Verifique sua internet.');
			}
			reject();
		});
	});

	return result;
};

// retorna o token que está gravado na memória do celular
export const getDBToken = () => {
	let token = ''
	AsyncStorage.getItem('token').then(dados => {
		token = dados.replace(/['"]+/g, '')
	})
	return token
}

// TURMAS
export const inserirTurma = (dados, token, ) => {
	data = {
		"students": dados.student,
		"teacher": dados.teacher,
		"name": dados.turma
	}
	request(methods.POST, 'api/turmas', { token, params: data })
}

export const inserirTurmaSimples = (dados, token, ) => {
	data = {
		"teacher": dados.teacher,
		"name": dados.turma
	}
	request(methods.POST, 'api/turmas', { token, params: data })
}
export const getTurma = (token) => {
	return request(methods.GET, 'api/turmas', { token });
}

export const getAlunosFromTurma = (token, id) => {
	return request(methods.GET, `api/turmas/search/${id}`, { token })
}

export const criarTurma = (data, token) => {
	const payload = {
		"students": data.teacher,
		"teacher": { "name": data.teacher },
		"name": data.name
	}
	return request(methods.POST, 'api/turmas', { token, params: payload })
}

// CHAMADAS
export const inserirPresenca = (matricula, disciplina, token) => {
	const data = {
		student: matricula,
		subject: disciplina
	}
	return request(methods.POST, 'api/chamada', { token, params: data })
}

export const inserirFalta = (quantFaltas, nome, turma, token) => {
	const data = {
		"faults": quantFaltas,
		"student": nome,
		"turma": turma
	}
	request(methods.POST, 'api/faltas', { token, params: data });
};

// ALUNOS
export const getallAlunos = (token) => {

	return request(methods.GET, 'api/alunos', { token });
}



export const inserirAluno = (nome, matricula, curso, disciplina, token) => {
	const data = {
		name: nome,
		id_subscription: matricula,
		course: curso,
		subject: disciplina
	};
	return request(methods.POST, 'api/alunos', { params: data, token });
}

export const removerAluno = (matricula) => {
	const data = {
		id_subscription: matricula
	}
	return request(methods.DELETE, `api/alunos/${matricula}`, { token, params: data })
}

export const procuraAluno = (procura, token) => {
	return request(methods.POST, `api/alunos/${procura}`, { token })
}

// DISCIPLINA
export const inserirDisciplina = (dados, token) => {
	const data = {
		'name': dados.name,
		'teacher': { 'name': dados.teacher }
	}
	request(methods.POST, 'api/disciplinas', { params: data, token });
}

export const getAllDisciplinas = (token) => {
	request(methods.GET, 'api/disciplinas', { token })
}

// PROFESSOR
export const inserirProfessor = (name) => {
	const data = {
		name
	}
	request(methods.POST, 'api/professores', { token, params: data })
}

export const fazerLogin = (nome, senha) => {
	const data = {
		username: nome,
		password: senha
	};
	return request(methods.POST, 'api/api-token', { params: data });
};
