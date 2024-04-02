import os

# Lista de todos los archivos bin
bin_files = [
    'group1-shard1of8.bin',
    'group1-shard2of8.bin',
    'group1-shard3of8.bin',
    'group1-shard4of8.bin',
    'group1-shard5of8.bin',
    'group1-shard6of8.bin',
    'group1-shard7of8.bin',
    'group1-shard8of8.bin',
]

output_path = 'combined_model.bin'

with open(output_path, 'wb') as combined:
    for bin_file in bin_files:
        with open(f'./{bin_file}', 'rb') as f:
            combined.write(f.read())
