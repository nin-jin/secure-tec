namespace $.$$ {
	export class $tec_operator_ota_applyer extends $.$tec_operator_ota_applyer {

		@$mol_action
		upload(files: File[]) {
			const bundle = $mol_wire_sync(this).readFileAsBuffer(files[0]) as ArrayBuffer
			const rights = new Uint8Array( bundle )
			this.yard().world().apply( rights )
		}

		async readFileAsBuffer(file: File) {
			let result_buffer = await new Promise((resolve) => {
				let fileReader = new FileReader();
				fileReader.onload = (e) => resolve(fileReader.result);
				fileReader.readAsArrayBuffer(file);
			});
			return result_buffer;
		}

	}
}
