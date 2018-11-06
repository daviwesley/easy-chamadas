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
const url_dev = "http://10.42.0.1:8000/"
const url_prod = "https://daviwesleyvk.pythonanywhere.com/"

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
	return AsyncStorage.getItem('token')
}

// CHAMADAS
export const inserirPresenca = (matricula, disciplina, token) => {
 const data = {
	 student: matricula,
	 subject: disciplina
 }
 return request(methods.POST, 'api/chamada', { token, params: data})
}

export const inserirFalta = (quantFaltas, matricula, disciplina, token) => {
	const data = {
		"faults": quantFaltas,
		"student": matricula,
		"subject": disciplina
	}
	return request(methods.POST, 'api/faltas', { token, params: data });
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
	return request(methods.POST, 'api/alunos', { token, params: data });
}

export const removerAluno = (matricula) => {
	const data = {
		id_subscription: matricula
	}
	return request(methods.DELETE, `api/alunos/${matricula}`, { token, params: data})
}

export const procuraAluno = (procura, token) => {
	return request(methods.POST, `api/alunos/${procura}`, { token })
}

// DISCIPLINA
export const inserirDisciplina = (nome, professor, token) => {
	const data = {
		'name': nome,
		'teacher': professor
	}
	request(methods.POST, 'api/disciplinas', { token, params: data });
}

export const fazerLogin = (nome, senha) => {
	const data = {
		username: nome,
		password: senha
	};
	return request(methods.POST, 'api/api-token', { params: data });
};
