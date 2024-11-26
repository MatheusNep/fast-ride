import mongoose from 'mongoose';

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/fast-ride';

  try {
    await mongoose.connect(mongoUri, {  });
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export default connectToDatabase;