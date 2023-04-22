namespace $.$$ {
	export class $tec_operator_ota extends $.$tec_operator_ota {

		@$mol_action
		upload(files: File[]) {
			const land = this.yard().land_grab();
			const dict = land.node("0_0", $hyoo_crowd_dict)

			for (const file of files) {
				const code = $mol_wire_sync(this.readFileAsBuffer)(file) as ArrayBuffer
				dict.sub(file.name, $hyoo_crowd_blob).buffer(
					new Uint8Array(code)
				)
			}
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
